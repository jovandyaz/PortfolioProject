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

router.get('/stocks/:idPortf/:symbol', async (req, res) => {
    const idPortf = req.params.idPortf
    const symbol = req.params.symbol
    await Stock
        .find({
            portfolio: idPortf,
            symbol: symbol
        }, (err, stocks) => {
            console.log("stocks:\n", stocks)
            var totalAmount = 0
            var averageCost = 0
            stocks.forEach(a => {
                totalAmount += a.amount
                averageCost += a.price * a.amount
            })
            console.log("totalAmount: ", totalAmount)
            console.log("averageCost: ", averageCost / totalAmount)
            const newStock = {}
            newStock.symbol = symbol
            newStock.totalAmount = totalAmount
            newStock.averageCost = averageCost / totalAmount
            res.send(newStock)
        })
})

router.post('/stock', function (req, res) {
    // console.log("receiving stock: ", req.body)
    const newStock = new Stock(req.body)
    newStock.totalCostFee = newStock.price * (newStock.percentFee / 100) * newStock.amount
    newStock.save(async (err, stock) => {
        console.log("stock: ", stock)
        await Portfolio.findByIdAndUpdate(
            { _id: newStock.portfolio },
            { $push: { stocks: newStock._id } }
        )
    })
    res.send(newStock)
})

module.exports = router