const express = require('express')
const router = express.Router()
const Portfolio = require('../models/portfolioModel')
const Cash = require('../models/cashModel')

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
        console.log("cash...save:\n", cash)
        await Portfolio
            .findByIdAndUpdate({ _id: newcash.portfolio }, {
                $push: {
                    cash: newcash._id
                }
            })

        await Cash
            .find({
                portfolio: newcash.portfolio,
            }, async (err, cash) => {
                console.log("cash:\n", cash)
                const totalCash = {}
                let totalResult = 0
                let deposits = 0
                let withdraws = 0
                cash.forEach(a => {
                    if (a.operation === "Deposit") {
                        deposits += a.amount
                    }
                    else if (a.operation === "Withdraw") {
                        withdraws += a.amount
                    }
                    totalResult = deposits - withdraws
                })
                console.log("totalResult: ", totalResult)
                totalCash.deposits = deposits
                totalCash.withdraws = withdraws
                totalCash.totalResult = totalResult

                await Portfolio
                    .findByIdAndUpdate({ _id: newcash.portfolio }, {
                        totalCash: totalCash.totalResult
                    })
            })
    })
    res.send(req.body)
})

module.exports = router