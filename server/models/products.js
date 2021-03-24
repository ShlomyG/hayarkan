const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type: String,  required:[true,"Please check your data entry, no name specified!"]},
    price:{type: Number, required:true},
    image:{type: String},
    category_id:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required:true
    }},
    {versionKey: false}
)


module.exports = mongoose.model('product', productSchema)
