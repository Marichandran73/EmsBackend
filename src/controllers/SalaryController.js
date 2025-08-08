import SalaryModel  from "../models/salary.js";

export const AddSalary = async (req, res) => {
  try {
    const {
      department,
      employeeId,
      basicSalary,
      allowences,  
      deduction,
      payDate       
    } = req.body;


    const totalSalary = parseInt(basicSalary) + parseInt(allowance || 0) - parseInt(deduction || 0);

    const newSalary = new SalaryModel({
      department,
      employeeId,
      basicSalary,
      allowance,
      deduction,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();

    return res.status(201).json({
      success: true,
      message: "Salary added successfully",
      salary: newSalary,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const GetSalaryById = async (req, res) => {
  try {
     const employeeId = req.params.id;

    const salary = await SalaryModel.findOne({ employeeId });
    

    if (!salary) {
      return res.status(404).json({ success: false, message: 'Salary not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Salary retrieved successfully',
      salary, 
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

