const Url = require('../urls')
const db = require('../../config/mongoose')
const shortenUrl = require('../../functions/shortenUrl')
const shortLength = 5

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Url.create({ originalUrl: `http://testUrl-${i}.com.tw`, shortUrl: shortenUrl(shortLength) })
  }
  console.log('done.')
})