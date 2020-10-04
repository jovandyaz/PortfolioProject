const mongoose = require('mongoose')
const Schema = mongoose.Schema

const portfolioSchema = new Schema({
    user: {type: String, trim: true, default: ''},
    portfolioName: {type: String, trim: true, default: ''},
    totalCash: {type: Number, default: 0}, 
    current: {type: String, trim: true, default: ''},
    stocks: [{ type: Schema.Types.ObjectId, ref: 'Stock' }],
    cash: [{ type: Schema.Types.ObjectId, ref: 'Cash' }]
})

const Portfolio = mongoose.model("Portfolio", portfolioSchema)
module.exports = Portfolio

