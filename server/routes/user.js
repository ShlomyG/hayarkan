const router = require('express').Router()
const User = require('../models/users');
const Cart = require('../models/carts');
const jwt = require('jsonwebtoken')
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const {verifyUser} = require('../verify')

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

router.get('/',verifyUser,(req,res)=>{
    res.send(req.user)
})


router.post('/register_first_step', async (req, res) => {
    const { userId } = req.body
    if (userId) {
        try {
            const answer = await User.find({ userId })
            console.log(answer)
            if (answer.length === 0) {
                res.status(201).json({ error: false, msg: "user id does not exist in the system, you can move on to the next step" })
            } else {
                res.status(201).json({ error: true, msg: "An existing user id in the system" })
            }
        } catch (error) {
            res.status(500)
        }
    } else {
        res.status(400).json({ error: true, msg: "Missing some info" })
    }
})


router.post('/register', async (req,res) => {
try {
    const {userId, fname, lname, email, password, city, address} = req.body
    const salt = genSaltSync(10)
    const hash = hashSync(password, salt) 
    const newUser =  new User ({_id:new mongoose.Types.ObjectId(), userId, fname, lname, email, password:hash, city, address,admin:false})
    const saveUser = await newUser.save()
    let access_token = jwt.sign({ _id:newUser._id, userId, fname, lname,email,city ,address, admin:newUser.admin }, "Sg007", {
        expiresIn: "60m"
    })
    console.log("Saved user:", saveUser)
    res.status(201).json({ error: false, msg: "User Register successfully",access_token })
} catch (err) {
    console.log(err)
    res.status(500).json(err)
}
})




router.post("/login", async (req, res) => {
    const { userId, password } = req.body
    // data exist
    if (userId && password) {
        // user exist
        try {
            let answer = await User.find({userId: userId})
            if (answer.length === 0) {
                res.status(401).json({ error: true, msg: "user not found" })
            } else {
                if (compareSync(password, answer[0].password)) {
                    console.log(answer)
                    let access_token = jwt.sign({ _id:answer[0]._id, userId: answer[0].userId, fname: answer[0].fname, lname: answer[0].lname,email: answer[0].email,city:answer[0].city ,address:answer[0].address, admin: answer[0].admin }, "Sg007", {
                        expiresIn: "60m"
                    })
                        res.status(200).json({ error: false, msg: "User Login successfully",access_token })
                } else {
                    res.status(401).json({ error: true, msg: "Wrong password, Try again" })
                }
            }
        } catch (error) {
            res.status(401)
        }
    } else {
        res.status(400).json({ error: true, msg: "Missing some info" })
    }
})






router.get('/new_cart/:userId', verifyUser, async (req,res) => {
    const checkUser = await Cart.find({user_id: req.params.userId})
    // console.log(checkUser) 
    if (checkUser.length === 0) {
try {
    const newCart =  new Cart ({user_id: req.params.userId})
    const saveCart = await newCart.save()
    console.log("Cart is open:", saveCart)
    res.send(200).json(saveCart)
} catch (err) {
    console.log(err)
    res.status(500).json(err)
}}else{
    console.log("user have cart already")
    res.json(checkUser)
}
})

router.post('/add_product_to_cart/:cartId',verifyUser, async (req,res) => {
    const {product_id, quantity, price, sub_total_price} = req.body
    const cart = await Cart.findById(req.params.cartId);
    const indexProductInCart = cart.products.map(p => p.product_id).indexOf( product_id)

try {
    if(indexProductInCart === -1){
    await Cart.findByIdAndUpdate( req.params.cartId, { $push: { products:{product_id, quantity,price, sub_total_price: quantity * price} }}) 
    }else{
   cart.products[indexProductInCart].quantity += quantity 
   cart.products[indexProductInCart].sub_total_price += price * quantity 
}
await cart.save()


    await Cart.updateMany(
        { },[{ "$set": {"total_price": { "$sum": "$products.sub_total_price" }} }, ]
     )
    //  console.log("cart:"+cart)
     const result = await Cart.find({_id:req.params.cartId}).populate('products.product_id')
        res.status(201).json(result)
} catch (err) {
    console.log(err)
    res.status(500).json(err)
}
})

// router.delete('/delete_cart/:cartId', async (req,res) => {
//     try {
//         await Cart.findByIdAndDelete (req.params.cartId)
//         res.sendStatus(200)


//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

router.delete('/clear_cart/:cartId',verifyUser, async (req,res) => {
    const cart = await Cart.findById(req.params.cartId);
    console.log("cart" + cart)
    if(cart!==null)
    {
        cart.products= []
        await cart.save();
        await Cart.updateMany(
            { },[{ "$set": {"total_price": { "$sum": "$products.sub_total_price" }} }, ]
         )
         const result = await Cart.find({_id:req.params.cartId}).populate('products.product_id')
            res.status(201).json(result)
        
    }else{
        res.status(400).json({ error: true, msg: "Cart not found" })

    }
    

}
)

router.post('/remove_product_from_cart/:cartId',verifyUser, async (req,res) => {
    const {product_id} = req.body
    const cart = await Cart.findById(req.params.cartId);
    const indexProductInCart = cart.products.map(p => p.product_id).indexOf( product_id)
    //check if the product in the cart
    if (indexProductInCart !== -1)
    {
try {
    cart.products.splice(indexProductInCart,1)
    await cart.save();
    await Cart.updateMany(
        { },[{ "$set": {"total_price": { "$sum": "$products.sub_total_price" }} }, ]
     ) 
     const result = await Cart.find({_id:req.params.cartId}).populate('products.product_id')
     console.log(result)
     res.status(201).json(result)
} catch (err) {
    console.log(err)
    res.status(500).json(err)
}}else{
    res.status(400).json({ error: true, msg: "The item not in the cart" })
}
})



router.get('/getCartByUser/:userId',verifyUser, async (req,res)=>{
    try {
        const result = await Cart.find({user_id:req.params.userId}).populate('products.product_id')
        console.log(req.params.userId)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/getAllUsers',async (req,res)=>{
    try {
        const result = await User.find({})
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports =  router