import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'

export const app = express();

app.use(cors({
origin:process.env.CORS_ORIGIN,
  credentials : true
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({
extended:true,
limit:"16kb"
}))

app.use(cookieparser());

import userRouter from './routes/User.routes.js'
app.use('/api/v1/user', userRouter);

import propertyRouter from './routes/Property.routes.js'
app.use('/api/v1/property', propertyRouter);

import enquiryRouter from './routes/Enquiry.routes.js'
app.use('/api/v1/enquiry', enquiryRouter);

import adminRouter from './routes/Admin.routes.js'
app.use('/api/v1/admin', adminRouter);