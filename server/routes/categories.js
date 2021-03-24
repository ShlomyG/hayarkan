const router = require('express').Router()
const Categories = require('../models/categories');
const mongoose = require('mongoose');

router.post('/add', async (req,res) => {
try {
    const {name} = req.body
    const newCategory =  new Categories ({_id:new mongoose.Types.ObjectId(), name})
    const saveCategory = await newCategory.save()
    console.log("Saved category:", saveCategory)
    res.sendStatus(201)
} catch (err) {
    console.log(err)
    res.status(500).json(err)
}
})


router.get('/',async (req,res)=>{
    try {
        const result = await Categories.find({})
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/:id',async (req,res)=>{
    try {
        const result = await Categories.find({_id: req.params.id})
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})




module.exports =  router