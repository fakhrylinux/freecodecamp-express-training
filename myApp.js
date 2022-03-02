require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

console.log('Hello World')

// app.get('/', function (req, res) {
//   res.send('Hello Express')
// })

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.use('/public', express.static(__dirname + '/public'))

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({
      'message': 'HELLO JSON',
    })
  } else {
    res.json({
      'message': 'Hello json',
    })
  }
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.json({
    'time': req.time,
  })
})

app.get('/:word/echo', (req, res) => {
  res.json({
    'echo': req.params.word,
  })
})

app.get('/name', (req, res) => {
  res.json({
    'name': `${req.query.first} ${req.query.last}`,
  })
})

app.post('/name', (req, res) => {
  res.json({
    'name': `${req.body.first} ${req.body.last}`,
  })
})

module.exports = app
