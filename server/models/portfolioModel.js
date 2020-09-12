const mongoose = require('mongoose')
const Schema = mongoose.Schema

const portfolioSchema = new Schema({
    User: String,
    PortfolioName: String,
    Stocks: {}
})

const Portfolio = mongoose.model("portfolio", portfolioSchema)
module.exports = Portfolio