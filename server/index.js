const express = require('express'),
  webpack = require('webpack'),
  memFS = require('memory-fs'),
  Redis = require('redis-stream'),
  redisClient = new Redis(6379, 'localhost', 0),
  makeWebpackConfig = require('./webpack.config.js'),
  {wrapContent, wrapBundle} = require('./containers.js')

const { Pool } = require('pg')
const pool = new Pool()

const app = express()

const getCachedBundle = (res, conn, key) => {
  return new Promise((resolve, reject) => {
    const exists = conn.stream('exists')
    exists.on('data', flag => {
      if (flag==0) reject('no key in cache')
      else {
        const bundleStream = conn.stream('get')
        bundleStream.pipe(res)
        bundleStream.on('end', () => resolve(key))
        bundleStream.on('error', error => reject(error))
        bundleStream.write(key)
        bundleStream.end()
      }
    }) 
    exists.write(key)
    exists.end()
  })
}

const tempFS = new memFS()

const makeBundle = compiler => {
  compiler.outputFileSystem = tempFS
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => (err) ? reject(err) : resolve(stats.toString()))
  })
}


app.use((req, res, next) => {(req.path=='/favicon.ico')?res.sendStatus(404):next()})



app.use((req, res, next) => {
  const requestTerms = req.path.split('/').reduce((terms, val) => {
    const clean = val.replace(/\W+/g, '')
    if (clean.length > 0) terms.add(clean.toLowerCase())
    return terms
  }, new Set())
  if (requestTerms.size == 0) requestTerms.add('default')
  const bundleCacheKey = Array.from(requestTerms).sort().join('-')
  getCachedBundle(res, redisClient, bundleCacheKey)
    .then(() => next())
    .catch(cacheErr => {
      console.log('Cache miss:', cacheErr)
      pool.connect()
        .then(client => {
          return client.query('SELECT * FROM posts WHERE id = $1', [1])
            .then(resp => {
              client.release()
              const wrappedContent = wrapContent(resp.rows[0].content)
              const compiler = webpack(makeWebpackConfig(wrappedContent))
              makeBundle(compiler).then((stats) => {
                console.log(stats)
                const bundleStream = wrapBundle(tempFS.createReadStream('/bundle.js'))
                bundleStream.pipe(res)
              }).catch(compileErr => console.log('Compile error:', compileErr))
            })
            .catch(e => {
              client.release()
              console.log(e.stack)
            })
        })
    })
  

})
const server = app.listen(3000)