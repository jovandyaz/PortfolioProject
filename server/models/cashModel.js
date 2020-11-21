const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cashSchema = new Schema({
    operation: {type: String, trim: true, default: ''},
    amount: {type: Number, default: 0}, 
    operationDate: {type: Date, default: Date.now},
    status: { type: String, trim: true, default: 'Processed' },
    dateStatus: { type: Date, default: Date.now },
    portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio' }
})

const Cash = mongoose.model("Cash", cashSchema)
module.exports = Cash