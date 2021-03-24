const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userId: {type: Number, required:[true,"Please check your data entry, no User id specified!"], unique:true},
    fname: {type: String, required:[true,"Please check your data entry, no First name specified!"]},
    lname: {type: String, required:[true,"Please check your data entry, no Last name specified!"]},
    email: {type: String, required:[true,"Please check your data entry, no Email specified!"]},
    password: {type: String, required:[true,"Please check your data entry, no Password specified!"], min:6},
    city: {type: String, required:[true,"Please check your data entry, no City specified!"]},
    address: {type: String, required:[true,"Please check your data entry, no Address specified!"]},
    admin: Boolean
}, 
{     versionKey: false
})
mongoose.set('useCreateIndex', true);

userSchema.plugin(uniqueValidator);
const Users = mongoose.model('user', userSchema);
module.exports = Users;