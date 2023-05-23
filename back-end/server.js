const express=require('express')
const connectDB=require('./config/db.js')
const morgan=require('morgan')
require('dotenv').config()
const app =express()
const port=process.env.port
const router = require('./routes/authRoute.js')
const categoryRoutes from './routes/categoryRoutes.js'

app .use(express.json())
app.use(morgan('dev'))
connectDB()

app .listen(port,console.log(`app is runnig port:${port}`))
app.use('/',router);
app use("/auth",authRoutes);
app.use('/category',caregoryRoutes)

app.get('/',(req,res))=>{
    res.send('<h1>Welcome to ecommerce fish></h1>')
}