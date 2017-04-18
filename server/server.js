var express = require('express')
var app = express()

var morgan = require('morgan')
var bodyParser = require('body-parser')
var _ = require('lodash')

var lionRouter = require('./lions')

app.use(morgan('dev'))
app.use(express.static('client'))
app.use (bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// mounting
app.use('/lions', lionRouter)

app.use(function(err, req, res, next){
    if (err){
        console.log('---------++++++++++-----------------')
        res.status(500).send(err.message)
    }
})

// export the app which will make it easier for testing instead of 
// listening here. then another file, requires the app and starts the server
module.exports = app
