require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()

const urlHandler = new (require('./shortUrlHandler'))()

// Basic Configuration
const port = process.env.PORT || 3000

// handle urlencoded data
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

app.use('/public', express.static(`${process.cwd()}/public`))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

app.post('/api/shorturl', (req, res) => {
  let { url } = req.body

  if (!url) return res.json({ error: 'invalid url' })

  let { passed } = urlHandler.testShortUrl(url)

  if (!passed) {
    return res.json({ error: 'invalid url' })
  }

  let { original_url, short_url } = urlHandler.createOrUpdateUrl(url)

  return res.json({ original_url, short_url })
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
