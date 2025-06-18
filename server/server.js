
import express from 'express'
import cors from 'cors'
import mongoose, { connect } from 'mongoose'
import 'dotenv/config'
import connectDB from './configs/db.js'
import adminRouter from './routes/adminRoutes.js'
import addBlogRouter from './routes/blogRoutes.js'
import blogRouter from './routes/blogRoutes.js'

const app = express()



//Middle ware
app.use(cors())
app.use(express.json())


//Mongo Client ----------------------------

/*const uri = "mongodb+srv://subh:Sk123456%23%2F@cluster0.1t5v9kc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/quickblog";

mongoose.connect(uri).then(()=>{
    console.log("Succesfully Connected")
}).catch((err)=>{
    console.log(err.message)
})*/
await connectDB()








//Routes 

const PORT = process.env.PORT ||  3000
app.get('/',(req,res)=>{
    res.send("Api is working")
})
app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)
















app.listen(PORT,()=>{
    console.log("Sucessfully running on port "+PORT)
})