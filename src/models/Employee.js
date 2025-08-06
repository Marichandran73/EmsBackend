import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  userId:{
  type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
   employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
  },
  phone: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
   department: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
 

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
export default Employee;
