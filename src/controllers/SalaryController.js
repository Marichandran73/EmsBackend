import SalaryModel  from "../models/salary.js";
import Employee from '../models/Employee.js'


export const AddSalary = async (req, res) => {
  try {
    const {employeeId, basicSalary, allowences, deduction, payDate } = req.body;

    const totalSalary =
      parseInt(basicSalary || 0) +
      parseInt(allowences || 0) -
      parseInt(deduction || 0);

    const newSalary = new SalaryModel({
      employeeId,
      basicSalary,
      allowences,
      deduction,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();

    return res.status(200).json({
      success: true,
      message: "Salary added successfully",
      salary: newSalary,
    });
  } catch (err) {
    console.error(" Backend error while saving salary:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Salary already exists for this employee (duplicate employeeId).",
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const GetSalaryById = async (req, res) => {
  try {
    const { id } = req.params;

    let salary = await SalaryModel.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId"
    );

    if (!salary || salary.length < 1) {
      const employee = await Employee.findOne({ userId: id });

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      salary = await SalaryModel.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId"
      );
    }
    return res.status(200).json({
      success: true,
      message: "Salary retrieved successfully",
      salary,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


