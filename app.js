// includes express
const express = require('express')
const app = express()
const port = 3000
const Url = require('./models/urls')
const shortenUrl = require('./shortenUrl')
const shortLength = 5 // 可調整縮短網址的亂碼字數

// includes mongoose
const mongoose = require('mongoose')

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
})

// includes handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))

// setting routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/urls', (req, res) => {
  const inputUrl = req.body.inputUrl
  if (inputUrl.trim()) {
    Url.findOne({ originalUrl: inputUrl })
      .then(data => data ? data : Url.create({ originalUrl: inputUrl, shortUrl: shortenUrl(shortLength) }))
      .then(data => res.render('index', { origin: req.headers.origin, shortUrl: data.shortUrl }))
      .catch(err => console.error(err))
  } else {
    res.redirect('/')
  }
})

app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  Url.findOne({ shortUrl })
    .then(data => res.redirect(data.originalUrl))
    .catch(err => console.error(err))
})

app.listen(port, () => {
  console.log(`The Express server is listening on http://localhost:${port}`)
})