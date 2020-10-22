const express = require('express')
const router = express.Router()
const Portfolio = require('../models/portfolioModel')
const Stock = require('../models/stockModel')

router.get('/stocks', async (req, res) => {
    try {
        const stock = await Stock.find()
        res.json(stock)
    } catch (err) {
        res.status(500).json({ Error: err })
    }
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
    const newStock = new Stock(req.body)
    newStock.totalCostFee = newStock.price * (newStock.percentFee / 100) * newStock.amount
    try {
        const saveStock = newStock.save(async (err, stock) => {
            console.log("stock: ", stock)
            await Portfolio.findByIdAndUpdate(
                { _id: newStock.portfolio },
                { $push: { stocks: newStock._id } })
        })
        res.json(saveStock)
    } catch (err) {

    }

})

module.exports = router