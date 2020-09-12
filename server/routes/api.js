const express = require('express')
const router = express.Router()
const Stock = require('../models/stockModel')

router.get('/stocks', function (req, res) {
    Stock.find({}, function (err, stocks) {
        // console.log("stocks:\n", stocks)
        res.send(stocks)
    })
})

router.post('/stock', function (req, res) {
    console.log("(req.body):", req.body)
    const newStock = new Stock(req.body)
    newStock.save()
    res.send("POST COMPLETE")
})

module.exports = router