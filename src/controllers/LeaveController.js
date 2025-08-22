import LeaveModel from "../models/LeaveModel.js";
import Employee from "../models/Employee.js";
import mongoose from 'mongoose';


export const AddLeave = async (req, res) => {
  try {
    const { UserIds, leaveType, startDate, endDate, reason } = req.body;

    if (!UserIds || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: "End date cannot be earlier than start date",
      });
    }

    const employeeValue = await Employee.findOne({ userId: UserIds });

    if (!employeeValue) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }


    const newLeave = new LeaveModel({
      employeeId: employeeValue._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();

    return res.status(201).json({
      success: true,
      message: "Leave request submitted successfully",
    });

  } catch (err) {
    console.error("Backend error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};


export const GetLeavesByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log('leaves data :',id)

    const employee = await Employee.findOne({ userId: id });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found for this user",
      });
    }
    const getLeaves = await LeaveModel.find({ employeeId: employee._id });
    return res.status(200).json({
      success: true,
      message: "Your leave details",
      getLeaves,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const GetLeaves =async(req, res)=>{
  try {
   const Leaves =await LeaveModel.find().populate({
    path:"employeeId",
    populate :[
      {
        path:"department",
        select: 'departmentName'
      },
      {
        path:'userId',
        select:'name'
      }
    ]
   })

    return res.status(200).json({
      success: true,
      message: "Your leave details",
      Leaves,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export const GetDetails= async(req, res)=>{
  const {id}= req.params;

  try{
    const Leave= await LeaveModel.findById({_id:id}).populate({
    path:"employeeId",
    populate :[
      {
        path:"department",
        select: 'departmentName'
      },
      {
        path:'userId',
        select:'name, profileImage'
      }
    ]
   })
    if(!Leave){
      res.status(401).json({
        success:false,
        message:"leave not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Your leave details",
      Leave,
    });
  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }

}

export const UpdateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedLeave = await LeaveModel.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({
        success: false,
        message: "Leave status not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully updated your status",
      data: updatedLeave
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
