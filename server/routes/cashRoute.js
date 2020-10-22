const express = require('express')
const router = express.Router()
const Portfolio = require('../models/portfolioModel')
const Cash = require('../models/cashModel')

router.get('/cash', async (req, res) => {
    try {
        const cash = await Cash.find()
        res.json(cash)
    } catch (err) {
        res.status(500).json({ Error: err })
    }
})

router.post('/cash', async (req, res) => {
    const newcash = new Cash(req.body)
    try {
        const saveCash = await newcash.save(async (err, cash) => {
            console.log("saving cash:\n", cash)
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
        res.json(saveCash)
    } catch (err) {
        res.json({ Error: err })
    }
})

module.exports = router