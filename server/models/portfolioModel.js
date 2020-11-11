const mongoose = require('mongoose')
const Schema = mongoose.Schema

const portfolioSchema = new Schema({
    user: { type: String, trim: true, default: '' },
    portfolioName: { type: String, trim: true, default: '' },
    unrealizedPL: { type: Number, default: 0 },
    realizedPL: { type: Number, default: 0 },
    totalCash: { type: Number, default: 0 },
    current: { type: String, trim: true, default: 'USD' },
    date: { type: Date, default: Date.now },
    lotsHistory: { type: Number, default: 0 },
    stocks: [{ type: Schema.Types.ObjectId, ref: 'Stock' }],
    cash: [{ type: Schema.Types.ObjectId, ref: 'Cash' }]
})

const Portfolio = mongoose.model("Portfolio", portfolioSchema)
module.exports = Portfolio

