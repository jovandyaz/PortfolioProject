const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const stockSchema = new Schema({
    totalAmount: Number,  //total de acciones en cartera
    symbol: String,
    companyName: String,
    price: Number,
    datePrice: Date  //fecha de costo actual
    // datePrice: {type: String, default: moment().format("LL")}
})

const Stock = mongoose.model("stock", stockSchema)
module.exports = Stock