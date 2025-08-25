
require("dotenv").config()
const express = require("express")
const app = express()
const cors=require("cors")
const db = require("./config/db")
const userrouter=require("./routes/userroutes")
const cookiesparser=require("cookie-parser")


app.use(cors())
app.use(express.json())
app.use(cookiesparser())
app.use("/uploads", express.static("uploads")); 


app.use("/api/user",userrouter)
// app.get("/",(req,res)=>{
//     res.send("hello express")
// })


port=process.env.PORT || 2000

// db().then()
app.listen(port,()=>{
    console.log(`server is started is http://localhost:${port}`)
    db()
})

// app.listen(port,()=>{
//     console.log(`server is running on http://localhost:${port}`)
// })
 