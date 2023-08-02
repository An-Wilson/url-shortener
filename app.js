// includes express
const express = require('express')
const app = express()
const port = 3000
const router = express.Router()
const routes = require('./routes')

require('./config/mongoose')

// includes handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)

app.listen(port, () => {
  console.log(`The Express server is listening on http://localhost:${port}`)
})