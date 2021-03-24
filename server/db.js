const mongoose = require('mongoose')

// mongodb://localhost/supermarket

mongoose.connect('mongodb+srv://shlomy:007@cluster0.zj7bm.mongodb.net/hayarkan?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => {
	// we're connected!
	console.log('connected to mongo on localhost')
})
