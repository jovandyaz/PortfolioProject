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
    try {
        const findSymbol = await Stock.find({
            portfolio: idPortf,
            symbol: symbol
        })
        // console.log("Matched stocks:\n", findSymbol)
        var totalAmount = 0
        var totalCost = 0
        findSymbol.forEach(a => {
            totalAmount += a.amount
            totalCost += a.price * a.amount
        })
        console.log("totalAmount: ", totalAmount)
        console.log("averageCost: ", (totalCost / totalAmount).toFixed(2))
        const newStock = {}
        newStock.symbol = symbol
        newStock.totalAmount = totalAmount
        newStock.averageCost = (totalCost / totalAmount).toFixed(2)
        res.json(newStock)
    } catch (err) {
        res.status(500).json({ Error: err })
    }
})

router.post('/stock', async (req, res) => {
    const newStock = new Stock(req.body)
    newStock.totalCost = newStock.amount * newStock.price
    newStock.totalCostFee = (newStock.totalCost * (newStock.percentFee / 100)).toFixed(2)
    try {
        const cashPortf = await Portfolio.findById({ _id: newStock.portfolio }, { portfolioName: 1, totalCash: 1 })
        if (cashPortf.totalCash - (newStock.totalCost + newStock.totalCostFee) >= 0) {
            newStock.save(async (err, res) => {
                await Portfolio.findByIdAndUpdate(
                    { _id: newStock.portfolio },
                    { $push: { stocks: newStock._id } })
            })
            await Portfolio.findByIdAndUpdate(
                { _id: newStock.portfolio },
                { totalCash: cashPortf.totalCash - (newStock.totalCost + newStock.totalCostFee), }
            )
            res.json({ message: "Stock saved" })
        } else { res.json({ message: "Failed" }) }
    } catch (err) {
        res.json({ Error: err })
    }
})

module.exports = router