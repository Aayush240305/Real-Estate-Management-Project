import dotenv from 'dotenv'
import connectDB from './database/index.js'
import {app} from './app.js'

dotenv.config({path:'./.env'})

const port = process.env.PORT || 4000
connectDB()
.then(()=>{
app.listen(port,()=>{
console.log('Server is running at port :', port)
 })
})
.catch((e)=>{
console.log("MongoDb connection failed",e);
})