// includes express
const express = require('express')
const app = express()
const port = 3000

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

// setting routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/urls', (req, res) => {
  
})

app.listen(port, () => {
  console.log(`The Express server is listening on http://localhost:${port}`)
})