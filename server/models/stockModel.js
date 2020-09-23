const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const moment = require('moment')

const stockSchema = new Schema({
    symbol: String,
    companyName: String,
    operation: String,
    amount: Number,  // número de acciones compradas / vendidas
    price: Number,  // precio al cual se compró / vendió la acción
    fee: Number,
    priceDate: Date,  //costo en la fecha de operación // datePrice: {type: String, default: moment().format("LL")}
    portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio' }
})

const Stock = mongoose.model("Stock", stockSchema)
module.exports = Stock