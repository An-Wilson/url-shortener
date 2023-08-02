const mongoose = require('mongoose')
const Url = require('../urls')
const shortenUrl = require('../../shortenUrl')
const shortLength = 5

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Url.create({ originalUrl: `http://testUrl-${i}.com.tw`, shortUrl: shortenUrl(shortLength) })
  }
  console.log('done.')
})