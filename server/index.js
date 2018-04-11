require('dotenv').config()

const express = require('express'),
  cookieParser = require('cookie-parser'),
  jwt = require('jsonwebtoken'),
  Redis = require('redis-stream'),
  redisClient = new Redis(6379, 'localhost', 0),
  {getCachedResource} = require('./cache.js'),
  {wrapContent} = require('./wrap.js'),
  {termsQueryString, buildTree} = require('./components.js'),
  {setLocalUser, findUser} = require('./users.js'),
  {fetchAccessToken, fetchUserData} = require('./oauth.js')

import { renderToNodeStream } from 'react-dom/server'
import Content from 'src'

const { Pool } = require('pg')
const pool = new Pool({
  connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
})

const runDbQuery = async (query) => {
  const client = await pool.connect()
  try {
    return await client.query(query)
  } finally {
    client.release()
  }
}

const app = express()

app.use(cookieParser())
app.use((req, res, next) => {
  if (req.path == '/' && 'tags' in req.cookies) {
    res.redirect(req.cookies.path)
  } else {
    res.cookie('tags', req.path)
    next()
  }
})

app.use((req,res,next) => {
  const defaultUser = {name: 'anonymous', role: 'ro'}
  if ('token' in req.cookies) {
    const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
    req.user = payload && 'user' in payload ? findUser(payload.user) : defaultUser
  } else {
    req.user = defaultUser
  }
  next()
})

app.get('/oauth/:provider', (req, res, next) => {
  if ('code' in req.query) {
    const accessToken = fetchAccessToken(req.params.provider, req.query.code)
    const oauthUser = fetchUserData(req.params.provider, accessToken)
    req.user = setLocalUser(oauthUser)
    const token = jwt.sign(req.user, process.env.JWT_SECRET)
    res.cookie('token', token)
    next()
  }
  else res.redirect('/')
})

app.use((req, res, next) => {
  const isCacheable = /\/\w+\.\w+$/gi.test(req.path)
  if (isCacheable) {
    const resourceCacheKey = req.path.split('/').pop()
    getCachedResource(res, redisClient, resourceCacheKey)
      .then(() => next())
      .catch(cacheErr => console.log('Cache miss:', cacheErr))
  } else {
    const requestTerms = req.path.split('/').reduce((terms, val) => {
      const clean = val.replace(/\W+/g, '')
      if (clean.length > 0) terms.add(clean.toLowerCase())
      return terms
    }, new Set())
    const components = runDbQuery(...termsQueryString(requestTerms))
    const componentTree = buildTree(components)
    const reactContent = <Content data={componentTree} user={req.user}/>
    const contentStream = wrapContent(renderToNodeStream(reactContent))
    contentStream.pipe(res)
  }
})

const server = app.listen(3000)