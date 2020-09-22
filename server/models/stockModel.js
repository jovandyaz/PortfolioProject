const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const moment = require('moment')

const stockSchema = new Schema({
    symbol: String,
    companyName: String,
    operation: String,
    totalAmount: Number,  //total de acciones en cartera
    price: Number,
    fee: Number,
    priceDate: Date,  //costo en la fecha de operación // datePrice: {type: String, default: moment().format("LL")}
    portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio' }
})

const Stock = mongoose.model("Stock", stockSchema)
module.exports = Stock