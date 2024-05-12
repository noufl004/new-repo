

const express=require("express")
require('express-async-errors');

const app= express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const mongoDB=require('./db/connect')
require('dotenv').config() 
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')

const authRouter=require('./routes/authRoutes')
const userRouter=require('./routes/userRoutes')
const productRouter=require('./routes/productRoutes')
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET));// required to parse cookie 

// app.get('/',(req,res)=>{

//     res.send("testing data")
// })
app.use(express.static('./public'));
app.use(fileUpload());
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/order', orderRouter);

app.use(notFoundMiddleware)  
app.use(errorHandlerMiddleware) 
const port=process.env.PORT||3000;
const url=process.env.MONGO_URL
const start=async()=>{
try{
await mongoDB(url)
app.listen(port, console.log("app lis listeninggd"))
} 

catch (error){ 
  
console.log("errorsss")
} 

 
} 
start()