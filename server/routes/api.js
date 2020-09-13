const express = require('express')
const router = express.Router()
const Portfolio = require('../models/portfolioModel')
const Stock = require('../models/stockModel')

router.get('/stocks', function (req, res) {
    Stock.find({}, function (err, stocks) {
        // console.log("stocks:\n", stocks)
        res.send(stocks)
    })
})

router.post('/stock', async (req, res) => {
    console.log("posting stock: ", req.body)
    const newStock = new Stock(req.body)
    newStock.save(async (err, stock) => {
        console.log(stock)
        await Portfolio
            .findByIdAndUpdate({ _id: newStock.portfolio }, {
                $push: {
                    stocks: newStock._id
                }
            })
        // .exec(function (err, res) { console.log(res) })
    })
    res.send(req.body)
})

router.get('/portfolios', function (req, res) {
    Portfolio.find({}, function (err, portfs) {
        console.log("portfolios:\n", portfs)
        res.send(portfs)
    })
})

router.post('/portfolio', function (req, res) {
    console.log("(req.body):", req.body)
    const newPortf = new Portfolio(req.body)
    newPortf.save()
    res.send(req.body)
})

module.exports = router