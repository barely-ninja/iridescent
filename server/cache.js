const getCachedResource = (res, conn, key) => {
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


module.exports = {getCachedResource}