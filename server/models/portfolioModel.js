const mongoose = require('mongoose')
const Schema = mongoose.Schema

const portfolioSchema = new Schema({
    user: String,
    portfolioName: String,
    current: String,
    stocks: [{ type: Schema.Types.ObjectId, ref: 'Stock' }],
    cash: [{ type: Schema.Types.ObjectId, ref: 'Cash' }]
})

const Portfolio = mongoose.model("Portfolio", portfolioSchema)
module.exports = Portfolio

