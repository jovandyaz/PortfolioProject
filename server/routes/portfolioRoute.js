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

router.post('/portfolio', async (req, res) => {
    const newPortf = new Portfolio(req.body)
    const findPortfName = await Portfolio.find({ portfolioName: newPortf.portfolioName }, { portfolioName: 1 })
    if (findPortfName.length > 0) {
        if (findPortfName[findPortfName.length - 1].portfolioName.toLowerCase() === newPortf.portfolioName.toLowerCase()) {
            res.json({ message: "Duplicate" })
        }
    }
    else {
        try {
            const savePortf = await newPortf.save()
            res.json(savePortf)
        } catch (err) {
            res.json({ Error: err })
        }
    }
})

module.exports = router