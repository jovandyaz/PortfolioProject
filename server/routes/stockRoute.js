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
        const matchedStock = {}
        matchedStock.symbol = symbol
        matchedStock.totalRemaining = totalRemaining
        matchedStock.totalAmount = totalAmount
        matchedStock.averageCost = (totalCost / totalAmount).toFixed(2)
        res.json(matchedStock)
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
                const portf = await Portfolio.findById({ _id: newStock.portfolio }, { lotsHistory: 1, stocks: 1 })
                await Stock.findByIdAndUpdate(
                    { _id: portf.stocks[portf.stocks.length - 1] },
                    { lotNum: portf.lotsHistory }
                )
            })
            res.json({ message: "Stock saved" })
        } else { res.json({ message: "Failed" }) }
    } catch (err) {
        res.json({ Error: err })
    }
})

router.put('/stock', async (req, res) => {
    const sellStock = new Stock(req.body)
    sellStock.totalCost = sellStock.amount * sellStock.price
    sellStock.totalCostFee = (sellStock.totalCost * (sellStock.percentFee / 100)).toFixed(2)
    sellStock.remainingAmount = sellStock.amount
    sellStock.realizedPL = 0
    try {
        const matchedStocks = await Stock.find(
            { portfolio: sellStock.portfolio, symbol: sellStock.symbol, operation: "Buy", lotStatus: "Open" },
            { symbol: 1, amount: 1, price: 1, remainingAmount: 1, lotNum: 1 }).sort({ lotNum: 1 })
        console.log("matchedStocks:", matchedStocks)
        let totalStocks = 0
        matchedStocks.forEach(s => totalStocks += s.remainingAmount)

        if (sellStock.amount <= totalStocks) {
            const cashPortf = await Portfolio.findById({ _id: sellStock.portfolio }, { portfolioName: 1, totalCash: 1 })
            sellStock.save(async (err, res) => {
                await Portfolio.findByIdAndUpdate(
                    { _id: sellStock.portfolio },
                    {
                        $push: { stocks: sellStock._id },
                        totalCash: cashPortf.totalCash + (sellStock.totalCost - sellStock.totalCostFee),
                        $inc: { lotsHistory: 1 }
                    })
                const updatedPortf = await Portfolio.findById({ _id: sellStock.portfolio }, { lotsHistory: 1, stocks: 1 })
                await Stock.findByIdAndUpdate(
                    { _id: updatedPortf.stocks[updatedPortf.stocks.length - 1] },
                    { lotNum: updatedPortf.lotsHistory })

                var multipleLots = false
                for (let e of matchedStocks) {
                    if (sellStock.remainingAmount > 0) {
                        if ((e.remainingAmount - sellStock.remainingAmount) < 0) {
                            console.log(`el total de la venta es mayor a las acciones en el lote ${e.lotNum}`)
                            sellStock.realizedPL = sellStock.totalCost - (e.price * e.remainingAmount)
                            sellStock.remainingAmount -= e.remainingAmount
                            await Stock.findByIdAndUpdate(
                                { _id: e._id },
                                { remainingAmount: 0, lotStatus: "Closed" })
                            multipleLots = true
                        } else {
                            console.log("multipleLots:", multipleLots)
                            console.log("sellStock.remainingAmount:", sellStock.remainingAmount)
                            if (e.remainingAmount - sellStock.remainingAmount === 0) {
                                console.log(`el total de la venta es igual a las acciones en el lote ${e.lotNum}`)
                                multipleLots
                                    ? sellStock.realizedPL -= e.price * sellStock.remainingAmount
                                    : sellStock.realizedPL = sellStock.totalCost - e.price * sellStock.remainingAmount
                                await Stock.findByIdAndUpdate(
                                    { _id: e._id },
                                    { remainingAmount: 0, lotStatus: "Closed" })
                            } else {
                                console.log(`el total de la venta es menor a las acciones en el lote ${e.lotNum}`)
                                multipleLots
                                    ? sellStock.realizedPL -= e.price * (e.remainingAmount - sellStock.remainingAmount)
                                    : sellStock.realizedPL = sellStock.totalCost - e.price * (e.remainingAmount - sellStock.remainingAmount)
                                await Stock.findByIdAndUpdate(
                                    { _id: e._id },
                                    { $inc: { remainingAmount: - sellStock.remainingAmount } })
                            }
                            sellStock.remainingAmount = 0
                        }
                    }
                }
                await Stock.findByIdAndUpdate(
                    { _id: updatedPortf.stocks[updatedPortf.stocks.length - 1] },
                    { remainingAmount: 0, lotStatus: "Completed", realizedPL: sellStock.realizedPL })
            })
            res.json({ message: "Stock saved" })
        } else { res.json({ message: "Failed" }) }
    } catch (err) {
        res.status(500).json({ Error: err })
    }
})

module.exports = router