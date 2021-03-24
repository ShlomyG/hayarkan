const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    creation_date: {type:Date,default:Date.now},    
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:true
    },
    products:[
        {
            product_id:{type: mongoose.Schema.Types.ObjectId,ref:"product"},
            quantity:{type: Number, required:[true,"missing quantity"]},
            price:{type: Number},
            sub_total_price:{type: Number} ,
        }
    ],
    total_price: {type: Number}
},{versionKey: false})

const Carts = mongoose.model('cart', cartSchema);
module.exports = Carts;