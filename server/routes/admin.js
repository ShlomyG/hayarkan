const router = require('express').Router()
const Products = require('../models/products');
const mongoose = require('mongoose');
const { verifyAdmin } = require('../verify');

    

router.post('/add',verifyAdmin, async (req,res) => {
    try {
        const {name,price,image, category_id} = req.body
        const newProduct =  new Products ({_id:new mongoose.Types.ObjectId(), name,price,image,category_id})
        const saveProduct = await newProduct.save()
        console.log("Saved product:", saveProduct)
        const result = await Products.find({},{ __v: 0 }).populate('category_id')
        res.status(201).json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
    })

router.post('/edit/:productId',verifyAdmin, async (req,res) => {
    try {
        const {name,price,image, category_id} = req.body
        // const product = await P.findById(req.params.cartId);

        await Products.findByIdAndUpdate( req.params.productId, {name , price, image, category_id}) 
        const result = await Products.find({},{ __v: 0 }).populate('category_id')
        res.status(201).json(result)
    } catch (err) {  
        console.log(err)
        res.status(500).json(err)
    } 
    })
    


module.exports =  router