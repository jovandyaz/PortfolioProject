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

router.get('/portfolios/open_stocks', async (req, res) => {
    try {
        const portfs = await Portfolio.find()
            .populate({
                path: 'stocks',
                match: { lotStatus: 'Open' }
            })
            .populate("cash")
        res.json(portfs)
    } catch (err) {
        res.status(500).json({ Error: err })
    }
})

router.get('/portfolio/:id', async (req, res) => {
    let portfID = req.params.id
    try {
        const portf = await Portfolio.findById({ _id: portfID })
            .populate("stocks")
            .populate("cash")
        res.json(portf)
    } catch (err) {
        res.status(500).json({ Error: err })
    }
})

router.get('/portfolio/:id/open_stocks', async (req, res) => {
    let portfID = req.params.id
    try {
        const portf = await Portfolio.findById({ _id: portfID })
            .populate({
                path: 'stocks',
                match: { lotStatus: 'Open' }
            })
            .populate("cash")
        res.json(portf)
    } catch (err) {
        res.status(500).json({ Error: err })
    }
})

router.post('/portfolio', async (req, res) => {
    const newPortf = new Portfolio(req.body)
    const portfs = await Portfolio.find({}, { portfolioName: 1, _id: 0 })
    if (portfs.length > 0) {
        if (portfs.find(p => p.portfolioName.toLowerCase() === newPortf.portfolioName.toLowerCase())) {
            res.json({ message: "The portfolio already exists" })
        }
        else {
            try {
                await newPortf.save()
                res.json({ message: "The portfolio was successfully saved" })
            } catch (err) {
                res.json({ Error: err })
            }
        }
    }
})

module.exports = router