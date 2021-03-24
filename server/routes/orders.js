const router = require('express').Router()
const Orders = require('../models/orders');
const mongoose = require('mongoose');
const { verifyUser } = require('../verify');

router.get('/', async (req, res) => {
	try {
        const result = await Orders.find({},{ __v: 0 }).populate('cart_id')
		res.json(result)
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
})






router.post('/add',verifyUser, async (req,res) => {
try {
    const {user_id,cart_id,total_price,city,street,delivery_date,credit_card} = req.body
    let split4Digit = credit_card.toString().split('').slice(4).join('')
    const newOrder =  new Orders ({user_id,cart_id,total_price,city,street,delivery_date,credit_card_four_numbers:split4Digit})
    const saveOrder = await newOrder.save()
    console.log("Saved Order:", saveOrder._id)
    const result = await Orders.find({_id:saveOrder._id}).populate('cart_id')

    res.status(201).json(result)
} catch (err) {
    console.log(err)
    res.status(500).json(err)
}
})


router.get('/check_delivery_date',verifyUser, async (req,res)=>{
    try {
        const result = await Orders.aggregate([{
                    $group:{
                        _id:{
                            delivery_date: "$delivery_date"    
                        }, 
                        count: { $sum:1 },
                        date: { $first: "$delivery_date" }}
                },
                { $project: 
                    { date:
                        { $dateToString: { date: "$date" }
                        }, count: 1, _id: 0 }  }
            ])
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports =  router