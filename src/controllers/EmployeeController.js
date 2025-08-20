import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import Multer from "multer";
import User from "../models/user.js";
import path from "path";
import mongoose from "mongoose";




// File Upload Configuration
const Storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const Upload = Multer({ storage: Storage });

//  Create Employee Controller
export const CreateEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      department,
      employeeId,
      designation,
      salary,
      gender,
      address,
      password,
      dateOfBirth,
      role,
    } = req.body;

    //  Basic Validation
    if (
      !name || !email || !phone || !department || !designation ||
      !salary || !gender || !address || !password || !role
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    //  Check if Employee already exists
    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Employee already exists",
      });
    }

    //  Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : null,
    });

    const savedUser = await newUser.save();

    //  Create Employee (details)
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      phone,
      dateOfBirth,
      department,
      designation,
      salary,
      gender,
      address,
      createdAt: new Date(),
    });

   await newEmployee.save();
    return res.status(201).json({
      success: true,
      message: "Employee added successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};




export const GetEmployees =async(req ,res)=>{
    try{
        const employee = await Employee.find().populate("userId",{password:0}).populate('department');
        return res.status(200).json({
            success:true,
            employee
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        }) }
}

export const Getemployee = async (req, res) => {
  try {
    const { id } = req.params;

    let employee = await Employee.findById({_id:id})
      .populate("userId", { password: 0 })
      .populate("department");

    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
        
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Employee fetched successfully",
      employee,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



export const UpdateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      userId, 
      phone,
      designation,
      salary,
      address,
    } = req.body;
    

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    
    if (userId?._id) {
      await User.findByIdAndUpdate(userId._id, {
        name: userId.name,
        email: userId.email,
      }, { new: true, runValidators: true });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { phone, designation, salary, address },
      { new: true, runValidators: true }
    ).populate("userId", { password: 0 });

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error: " + err.message,
    });
  }
};

export const FetchEmployeeBydepId =async(req,res)=>{
  const { id } = req.params;
  try {
    const employee = await Employee.find({ department: id });
    return res.status(200).json({
      success: true,
      message: "Employee fetched successfully",
      employee,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

