// USE npm run dev TO START!!!!!
const express = require ('express')
const mongoose  = require('mongoose')
const app =  express()
require('dotenv').config()
const userController = require('./controller/User')

// middlewares
app.use(express.json())


// route
app.use('/user', userController)





// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));


const PORT = process.env.PORT || 8080


app.listen(PORT, console.log(`listening on port ${PORT}`))