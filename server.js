// Node Modules Imports
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

//Internal Modules Imports
const portfolioRoute = require('./server/routes/portfolioRoute')
const cashRoute = require('./server/routes/cashRoute')
const stockRoute = require('./server/routes/stockRoute')

// Mongoose set up & Connecting to Mongo DB
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/MarketDB',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`)
    })

// Setting up express and configuring bodyParser
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Server accepting "foreign" requests. /* Only required for development mode */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

//Connecting to our routes
app.use('/', portfolioRoute)
app.use('/', cashRoute)
app.use('/', stockRoute)

//Running the server
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Running server on http://localhost:${port}`))
