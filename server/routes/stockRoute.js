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

router.get('/stocks/:idPortf', function (req, res) {
    Stock.find({}, function (err, stocks) {
        // console.log("stocks:\n", stocks)
        res.send(stocks)
    })
})

router.post('/stock', function (req, res) {
    // console.log("receiving stock: ", req.body)
    const newStock = new Stock(req.body)
    newStock.costFee = newStock.price * (newStock.percentFee / 100)
    newStock.save(async (err, stock) => {
        console.log("stock: ", stock)
        await Portfolio
            .findByIdAndUpdate({ _id: newStock.portfolio }, {
                $push: {
                    stocks: newStock._id
                }
            })
    })
    res.send(newStock)
})

module.exports = router