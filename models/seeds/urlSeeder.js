const Url = require('../urls')
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Url.create({ originalUrl: `http://testUrl-${i}.com.tw`, shortUrl: shortenUrl(shortLength) })
  }
  console.log('done.')
})