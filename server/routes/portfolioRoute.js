const express = require('express')
const router = express.Router()
const Portfolio = require('../models/portfolioModel')

router.get('/portfolios', async (req, res) => {
    try {
        const portfs = await Portfolio.find()
            .populate("stocks")
            .populate("cash")
        res.json(portfs)
    } catch (err) {
        res.status(500).json({ Error: err })
    }
})

router.get('/portfolios/names', async (req, res) => {
    try {
        const findPortfsNames = await Portfolio
            .aggregate([{
                $project: { "portfolioName": 1, "_id": 0 }
            }])
        res.json(findPortfsNames)
    } catch (err) {
        res.status(500).json({ Error: err })
    }
})

router.post('/portfolio', async (req, res) => {
    const newPortf = new Portfolio(req.body)
    try {
        const savePortf = await newPortf.save()
        res.json(savePortf)
    } catch (err) {
        res.json({ Error: err })
    }
})

module.exports = router