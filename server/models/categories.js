const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type: String, required:[true,"Please check your data entry, no name specified!"]} 
}, {versionKey: false})

const Categories = mongoose.model('category', categorySchema)
module.exports = Categories