// const express = require('express');
// const cookieParser = require('cookie-parser');
// const app = express();
// app.use(cookieParser());

// const adminRouter = express.Router();

// const mymiddleware_1 = (req, res, next) => {
//     console.log('I am logging');
//     next();
// }

// const loggerwraper = (options) =>
//     function(req, res, next){
//         if(options.log){
//             console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`);
//             next()
//         }
//         else{
//             throw new Error('Failed to log')
//         }
       
//     }
    


// const logger = (req, res, next) => {
//     console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`);
//     throw new Error('This is an error');
// }

// adminRouter.use(loggerwraper({log:false}));
// adminRouter.get('/dashboard', (req, res) => {
//     res.send('dashboard');
// });

// // Define an error handler middleware specific to the adminRouter.
// const adminErrorHandler = (err, req, res, next) => {
//     console.error(err);
//     res.status(500).send('There is an error in the admin router');
// };

// // Attach the admin error handler middleware to the adminRouter.
// adminRouter.use(adminErrorHandler);

// app.use('/admin', adminRouter);

// app.get('/about', (req, res) => {
//     res.send('about');
// });

// app.listen(3000, () => {
//     console.log('Listening at port 3000');
// });
const express = require('express')
const mongoose = require('mongoose')
const todoHandler = require('./routeHandler/todoHandler')


//express app initialization
const app = express()
// const mongoose = require('mongoose')

app.use(express.json())
//database connection with mongoose
mongoose.connect('mongodb+srv://abid:abid1234@datastorage.csbl3rp.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParsar:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('connection successful')    
}).catch(()=>{
    console.log(err)
})
//application routers
app.use('/todo',todoHandler)
//deafault erro handlization
function errorHandler(err, req, res, next){
    if(res.headerSent){
        return next(err);
    }
    res.status(500).json({error:err});
}

app.listen(4000, ()=>{
    console.log('app listening at port 3000')
})
