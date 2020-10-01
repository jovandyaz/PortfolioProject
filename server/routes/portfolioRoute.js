const express = require('express')
const router = express.Router()
const Portfolio = require('../models/portfolioModel')

router.get('/portfolios', (req, res) => {
    Portfolio.find({}, function (err, portfs) {
        // console.log("portfolios:\n", portfs)
        res.send(portfs)
    })
    .populate("stocks")
    .populate("cash")
})

router.post('/portfolio', function (req, res) {
    console.log("(req.body):", req.body)
    const newPortf = new Portfolio(req.body)
    newPortf.save()
    res.send(req.body)
})

module.exports = router