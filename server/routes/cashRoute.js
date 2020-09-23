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

module.exports = router