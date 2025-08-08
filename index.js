import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config()

import AuthRouter from './src/routes/auth.route.js';
import DepartmentRouter from './src/routes/Department.route.js';
import EmployeeRouter from './src/routes/Employee.route.js';
import SalaryRouter from './src/routes/Salary.route.js';

import ConnectDB from "./config/db.js";
import path from 'path';
import { fileURLToPath } from 'url';


const app =express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())
app.use(express.json())
const PORT  = process.env.PORT || 3001


ConnectDB();

app.use('/Public', express.static(path.join(__dirname, 'Public')));
app.use('/api/auth',AuthRouter)

app.use('/api/department', DepartmentRouter)
app.use('/api/employee', EmployeeRouter)
app.use('/api/Salary', SalaryRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})