const express = require('express')
const router = express.Router()
const Url = require('../../models/urls')

// 首頁路由
router.get('/', (req, res) => {
  res.render('index')
})

// 縮短網址
router.post('/', (req, res) => {
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

// 指向原網址
router.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params
  Url.findOne({ shortUrl })
    .then(data => {
      if (!data) {
        return res.render('error', {
          errorMsg: "Can't found the link.",
          errorUrl: req.headers.host + "/" + shortUrl
        })
      }
      res.redirect(data.originalUrl)
    })
    .catch(err => console.error(err))
})

module.exports = router
