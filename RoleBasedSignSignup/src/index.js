const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')
const adminRouter = require('./routes/adminRoutes')
const quotes = require('./quotes.json')
const mongoose = require('mongoose');
app.use(express.json())
app.use('/admin', adminRouter)
app.use('/users', userRouter);
app.use('/note',noteRouter);
mongoose.connect("mongodb+srv://hasan:hasan@cluster0.kxda5xx.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    // server running

app.listen(5000,(req, res)=>{
    console.log('server started at port 5000')
})

})
.catch((error)=>{
    console.log(error)

})

