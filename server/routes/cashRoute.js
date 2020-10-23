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
    const newCash = new Cash(req.body)
    try {
        const updateCash = await Portfolio.findById({ _id: newCash.portfolio }, { portfolioName: 1, totalCash: 1 })
        if (newCash.operation === "Deposit") {
            saveCash(newCash)
            await Portfolio.findByIdAndUpdate({ _id: newCash.portfolio }, { totalCash: updateCash.totalCash + newCash.amount })
            res.json({ message: "Cash saved" })
        }
        else if (newCash.operation === "Withdraw") {
            if (updateCash.totalCash - newCash.amount >= 0) {
                saveCash(newCash)
                await Portfolio.findByIdAndUpdate({ _id: newCash.portfolio }, { totalCash: updateCash.totalCash - newCash.amount })
                res.json({ message: "Cash saved" })
            }
            else { res.json({ message: "Failed" }) }
        }
    } catch (err) {
        res.json({ Error: err })
    }
})

async function saveCash(newCash) {
    await newCash.save(async (err, res) => {
        await Portfolio.findByIdAndUpdate(
            { _id: newCash.portfolio },
            { $push: { cash: newCash._id } })
    })
}

module.exports = router