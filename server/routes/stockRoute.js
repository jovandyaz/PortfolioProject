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
            symbol: symbol,
            lotStatus: "Open"
        })
        // console.log("Matched stocks:\n", findSymbol)
        let totalRemaining = 0
        let totalAmount = 0
        let totalCost = 0
        findSymbol.forEach(a => {
            totalRemaining += a.remainingAmount
            totalAmount += a.amount
            totalCost += a.price * a.amount
        })
        // console.log("totalAmount: ", totalAmount)
        // console.log("averageCost: ", (totalCost / totalAmount).toFixed(2))
        const newStock = {}
        newStock.symbol = symbol
        newStock.totalRemaining = totalRemaining
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
    newStock.remainingAmount = newStock.amount
    try {
        const cashPortf = await Portfolio.findById({ _id: newStock.portfolio }, { portfolioName: 1, totalCash: 1 })
        if (cashPortf.totalCash - (newStock.totalCost + newStock.totalCostFee) >= 0) {
            newStock.save(async (err, res) => {
                await Portfolio.findByIdAndUpdate(
                    { _id: newStock.portfolio },
                    {
                        $push: { stocks: newStock._id },
                        totalCash: cashPortf.totalCash - (newStock.totalCost + newStock.totalCostFee),
                        $inc: { lotsHistory: 1 }
                    })
                const lotPortf = await Portfolio.findById({ _id: newStock.portfolio }, { lotsHistory: 1, stocks: 1 })
                await Stock.findByIdAndUpdate(
                    { _id: lotPortf.stocks[lotPortf.stocks.length - 1] },
                    { lotNum: lotPortf.lotsHistory }
                )
            })
            res.json({ message: "Stock saved" })
        } else { res.json({ message: "Failed" }) }
    } catch (err) {
        res.json({ Error: err })
    }
})

router.put('/stock', async (req, res) => {
    const newStock = new Stock(req.body)
    newStock.totalCost = newStock.amount * newStock.price
    newStock.totalCostFee = (newStock.totalCost * (newStock.percentFee / 100)).toFixed(2)
    newStock.remainingAmount = newStock.amount
    console.log("Stock to Sell:\n", newStock)
    try {
        const matchedStocks = await Stock.find(
            { portfolio: newStock.portfolio, symbol: newStock.symbol, operation: "Buy", lotStatus: "Open" },
            { symbol: 1, amount: 1, remainingAmount: 1, lotNum: 1 }).sort({ lotNum: 1 })
        console.log("matchedStocks:", matchedStocks)
        let totalStocks = 0
        matchedStocks.forEach(s => totalStocks += s.remainingAmount)

        if (newStock.amount <= totalStocks) {
            const cashPortf = await Portfolio.findById({ _id: newStock.portfolio }, { portfolioName: 1, totalCash: 1 })
            newStock.save(async (err, res) => {
                await Portfolio.findByIdAndUpdate(
                    { _id: newStock.portfolio },
                    {
                        $push: { stocks: newStock._id },
                        totalCash: cashPortf.totalCash + (newStock.totalCost - newStock.totalCostFee),
                        $inc: { lotsHistory: 1 }
                    })

                const lotPortf = await Portfolio.findById({ _id: newStock.portfolio }, { lotsHistory: 1, stocks: 1 })
                await Stock.findByIdAndUpdate(
                    { _id: lotPortf.stocks[lotPortf.stocks.length - 1] },
                    { lotNum: lotPortf.lotsHistory })

                for (let e of matchedStocks) {
                    if (newStock.remainingAmount > 0) {
                        if ((e.remainingAmount - newStock.remainingAmount) < 0) {
                            console.log(`el total de la venta es mayor a las acciones en el lote ${e.lotNum}`)
                            console.log("Diferencia: ", e.remainingAmount - newStock.remainingAmount)
                            await Stock.findOneAndUpdate(
                                { _id: e._id, lotNum: e.lotNum },
                                { remainingAmount: 0, lotStatus: "Closed" })
                                .then(res => console.log("res:", res))
                                .catch(err => console.log("err:", err))
                            newStock.remainingAmount -= e.remainingAmount
                            console.log("newStock.remainingAmount:", newStock.remainingAmount)
                        } else {
                            console.log(`el total de la venta es menor o igual a las acciones en el lote ${e.lotNum}`)
                            console.log("newStock.remainingAmount (before):", newStock.remainingAmount)
                            if (e.remainingAmount - newStock.remainingAmount === 0) {
                                await Stock.findOneAndUpdate(
                                    { _id: e._id, lotNum: e.lotNum },
                                    { remainingAmount: 0, lotStatus: "Closed" })
                                    .then(res => console.log("res:", res))
                                    .catch(err => console.log("err:", err))
                            } else {
                                await Stock.findOneAndUpdate(
                                    { _id: e._id, lotNum: e.lotNum },
                                    { $inc: { remainingAmount: - newStock.remainingAmount } })
                                    .then(res => console.log("res:", res))
                                    .catch(err => console.log("err:", err))
                            }
                            newStock.remainingAmount = 0
                            console.log("newStock.remainingAmount (after):", newStock.remainingAmount)
                        }
                    }
                }
                await Stock.findByIdAndUpdate(
                    { _id: lotPortf.stocks[lotPortf.stocks.length - 1] },
                    { remainingAmount: 0, lotStatus: "Completed" })
            })
            res.json({ message: "Stock saved" })
        } else { res.json({ message: "Failed" }) }
    } catch (err) {
        res.status(500).json({ Error: err })
    }
})

module.exports = router