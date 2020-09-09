const fs = require('fs');
var dotenv = require('dotenv')


if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  const localEnvConfig = dotenv.parse(fs.readFileSync('.env.local'));

  for (const k in localEnvConfig) {
    process.env[k] = localEnvConfig[k]
  }
}


module.exports = {
  port: Number.isNaN(parseInt(process.env.PORT)) ? 4000 : parseInt(process.env.PORT),
  salesLoftApi: {
    baseUrl: 'https://api.salesloft.com',
    paths: {
      people: '/v2/people.json'
    },
    apiKey: process.env.SALESLOFT_API_KEY,
    apiKeyPrefix: process.env.SALESLOFT_API_KEY_PREFIX
  }
}