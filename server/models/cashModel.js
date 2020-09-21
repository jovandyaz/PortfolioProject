const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cashSchema = new Schema({
    operation: String,
    amount: Number, 
    operationDate: Date,
    portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio' }
})

const Cash = mongoose.model("Cash", cashSchema)
module.exports = Cash