 const mongoose=require("mongoose")

 const dbconnection = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("db connected")
    } catch (error) {
        console.log("error")
    }
 }

 module.exports = dbconnection