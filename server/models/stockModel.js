const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema({
    symbol: {type: String, trim: true, default: ''},
    companyName: {type: String, trim: true, default: ''},
    operation: {type: String, trim: true, default: ''},
    amount: {type: Number, default: 0},  // número de acciones compradas / vendidas
    price: {type: Number, default: 0},  // precio al cual se compró / vendió la acción
    percentFee: {type: Number, default: 0},
    totalCostFee: {type: Number, default: 0},
    priceDate: {type: Date, default: Date.now},  //costo en la fecha de operación
    portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio' }
})

const Stock = mongoose.model("Stock", stockSchema)
module.exports = Stock