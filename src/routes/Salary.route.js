import Express from 'express';
import {
    AddSalary,
    GetSalaryById,
} from '../controllers/SalaryController.js';
import Authmiddleware from '../middleware/authmiddleware.js';

const router = Express.Router();

router.post('/addsalarys',Authmiddleware, AddSalary);
router.get('/forUser/:id',Authmiddleware, GetSalaryById);





export default router;