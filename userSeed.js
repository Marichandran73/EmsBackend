import dotenv from 'dotenv';
dotenv.config();



import User from './src/models/user.js';
import bcryptjs from 'bcryptjs';

import ConnectDB from './config/db.js'

const UserRegister = async () => {
  try {
    await ConnectDB();
    const hashPassword = await bcryptjs.hash('Marichandran', 10);

    const existingUser = await User.findOne({ email: "admin@gmail.com" });
    if (existingUser) {
      console.log("User already exists");
      process.exit();
    }
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: 'Admin'
    });

    await newUser.save();

    console.log(" User created successfully");
    process.exit();
  } catch (err) {
    console.error(" Error in user seed:", err.message);
    process.exit(1); 
  }
};

UserRegister();
