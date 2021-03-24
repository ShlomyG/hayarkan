const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    creation_date: {type:Date,default:Date.now},    
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    cart_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
        required:true
    },
    total_price: {type: Number, required:true},
    city:{type: String, required:true},
    street:{type: String, required:true},
    delivery_date:{type: Date, required:true},
    credit_card_four_numbers:{type: Number, required:true}
},{versionKey: false})
module.exports = mongoose.model('order', orderSchema)