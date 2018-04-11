const https = require('https')
const qs = require('querystring')

const postRequest = (options, payload) => new Promise ((resolve, reject) => {
  let req = https.request({method: 'POST', ...options})
  req.on('response', res => resolve(res))
  req.on('error', err => reject(err))
  req.write(payload)
  req.end()
})

const getRequest = (options) => new Promise ((resolve, reject) => {
  let req = https.request({method: 'GET', ...options}, (res) => {
    let buf = ''
    res.setEncoding('utf8')
    res.on('data', data => buf += data)
    res.on('end', () => resolve(JSON.parse(buf)))
  })
  req.on('error', err => reject(err))
  req.end()
})

const fetchAccessToken = async (provider, code) => {
  const prefix = provider.toUpperCase()

  const tokenAPI = {
    google: {
      host: 'www.googleapis.com',
      path: '/oauth2/v4/token'
    }
  }

  const payload = qs.stringify({
    client_id: process.env[`${prefix}_OAUTH_CLIENT_ID`],
    client_secret: process.env[`${prefix}_OAUTH_SECRET`],
    code,
    redirect_uri: process.env[`${prefix}_OAUTH_CALLBACK`],
    grant_type: 'authorization_code'
  })

  const options = {
    ...tokenAPI[provider],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(payload)
    }
  }

  return await postRequest(options, payload)
}

const fetchUserData = async (provider, accessToken) => {

  const tokenAPI = {
    google: {
      host: 'www.googleapis.com',
      path: '/userinfo/v2/me'
    }
  }

  const options = {
    ...tokenAPI[provider],
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  }

  return await getRequest(options)
}

module.exports = {
  fetchAccessToken,
  fetchUserData
}