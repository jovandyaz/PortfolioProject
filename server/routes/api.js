const express = require('express')
const router = express.Router()
const Portfolio = require('../models/portfolioModel')
const Stock = require('../models/stockModel')
const Cash = require('../models/cashModel')

router.get('/portfolios', (req, res) => {
    Portfolio.find({}, function (err, portfs) {
        console.log("portfolios:\n", portfs)
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

router.get('/cash', function (req, res) {
    Cash.find({}, function (err, cash) {
        // console.log("stocks:\n", stocks)
        res.send(cash)
    })
})

router.post('/cash', async (req, res) => {
    console.log("posting cash: ", req.body)
    const newcash = new Cash(req.body)
    newcash.save(async (err, cash) => {
        console.log(cash)
        await Portfolio
            .findByIdAndUpdate({ _id: newcash.portfolio }, {
                $push: {
                    cash: newcash._id
                }
            })
        // .exec(function (err, res) { console.log(res) })
    })
    res.send(req.body)
})

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





module.exports = router