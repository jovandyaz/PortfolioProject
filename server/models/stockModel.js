const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema({
    TotalAmount: Number,  //total de acciones en cartera
    Symbol: String,
    DateValue: Date,  //fecha de costo actual
    Price: Number,
})

const Stock = mongoose.model("stock", stockSchema)
module.exports = Stock