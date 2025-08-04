import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config()

import AuthRouter from './src/routes/auth.route.js';
import ConnectDB from "./config/db.js";


const app =express()

app.use(cors())
app.use(express.json())
const PORT  = process.env.PORT || 3001


ConnectDB();
app.use('/api/auth',AuthRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})