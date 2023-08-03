const express = require('express')
const router = express.Router()
const Url = require('../../models/urls')

const shortenUrl = require('../../functions/shortenUrl')
const shortLength = 5 // 定義縮短網址的字元數

// 首頁路由
router.get('/', (req, res) => {
  res.render('index')
})

// 縮短網址
router.post('/', (req, res) => {
  const inputUrl = req.body.inputUrl
  if (inputUrl.trim()) {
    Url.findOne({ originalUrl: inputUrl })
      // 從資料庫尋找使用者所輸入的原網址是否已存在於資料庫中？若資料庫已有該筆原網址資料，則回傳該筆資料的短網址 ; 若沒有存在則新增該筆資料
      .then(data => data ? data : Url.create({ originalUrl: inputUrl, shortUrl: shortenUrl(shortLength) }))
      .then(data => res.render('index', { origin: req.headers.origin, shortUrl: data.shortUrl }))
      .catch(err => console.error(err))
  } else {
    // 若使用者沒有輸入內容或只輸入空白時，導回首頁介面
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
