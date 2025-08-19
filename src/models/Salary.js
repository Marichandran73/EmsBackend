import Mongoose from 'mongoose';

const SalarySchema = new Mongoose.Schema({
    employeeId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    basicSalary: {
        type: Number,
        required: true
    },
    allowences: {
        type: Number,
    },
    deduction: {
        type: Number,
    },
    netSalary: {
        type: Number,
    },
    payDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

const SalaryModel = Mongoose.models.Salary || Mongoose.model('Salary', SalarySchema);
export default SalaryModel;
