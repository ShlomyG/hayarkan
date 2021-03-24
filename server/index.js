// const {json} = require('express')
require('./db')
const app = require('express')()

app.use(require('express').json())
app.use(require('cors')())

app.use('/user', require('./routes/user'))
app.use('/categories', require('./routes/categories'))
app.use('/products', require('./routes/products'))
app.use('/orders', require('./routes/orders'))
app.use('/admin', require('./routes/admin'))


app.listen(1000, ()=>console.log("server s'up"))