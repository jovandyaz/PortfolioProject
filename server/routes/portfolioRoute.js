const express = require('express')
const router = express.Router()
const Portfolio = require('../models/portfolioModel')

router.get('/portfolios', (req, res) => {

    // Portfolio
    //     .aggregate([{
    //         $project: { "portfolio": 1 }
    //     }])
    //     .exec(async (err, res) => {
    //         console.log("err: ", err)
    //         console.log("res: ", res)
    //         res.send(res)
    //     })

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