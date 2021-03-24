const router = require('express').Router()
const Products = require('../models/products');
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
	try {
        const result = await Products.find({},{ __v: 0 }).populate('category_id')
		res.json(result)
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
})

router.get('/:id',async (req,res)=>{
    try {
        const result = await Products.findOne({_id: req.params.id}).populate('category_id')
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})



router.get('/getByCategory/:id',async (req,res)=>{
    try {
        const result = await Products.find({category_id:req.params.id},{__v:0})
        console.log(req.params.id)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/search_product/:product',async (req,res)=>{
    try {
        const result = await Products.find({name:{ $regex: req.params.product, $options: "i" } })
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})






module.exports =  router