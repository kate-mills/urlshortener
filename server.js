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

  if (!url || !urlHandler.isValidUrl(url)) {
    return res.json({ error: 'invalid url' })
  }
  let { original_url, short_url } = urlHandler.findBySafeUrl(url)

  return res.json({ original_url, short_url })
})

app.get('/api/shorturl/:id', (req, res) => {
  let { id } = req.params
  let error = 'No short URL found for the given input'

  return urlHandler.isValidId(id)
    ? res.redirect(301, urlHandler.urls[parseInt(id)])
    : res.json({ error })
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
