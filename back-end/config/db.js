const mongoose=require('mongoose')
const connectDB=()=>{
    try {
        mongoose.connect(process.env.mongo_url)
        console.log("db is connected")
    } catch (error) {
        console.log("db is not connect")
    }
}
module.exports=connectDB