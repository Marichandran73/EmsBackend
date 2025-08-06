import Department from '../models/Department.js';

export const CreateDepartment = async (req, res) => {
  try {
    const { departmentName, description } = req.body;
    if (!departmentName || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields"
      });
    }

    const newDepartment = new Department({
      departmentName,
      description,
      createdBy: req.user._id,
      createdAt: new Date()
    });

    await newDepartment.save();
    return res.status(200).json({
      success: true,
      message: "Department added successfully",
      department: newDepartment
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const GetDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('createdBy', 'name');
    return res.status(200).json({
      success: true,
      departments
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const GetDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Department ID is required",
      });
    }
    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }

    return res.status(200).json({
      success: true,
      department
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const UpdateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentName, description } = req.body;

    const updated = await Department.findByIdAndUpdate(
      id,
      { departmentName, description },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Department updated successfully",
      department: updated
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
export const DeleteDepartment = async(req, res)=>{
  try{
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Department ID is required",
      });
    }
    const Deletedepartment = await Department.findByIdAndDelete(
      {_id: id},
    );
    return res.status(200).json({
      success: true,
      message: "Department deleted successfully",
      department: Deletedepartment
    })
  }catch(err){
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
