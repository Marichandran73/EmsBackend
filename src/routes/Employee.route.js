import Express from 'express';
import {
  CreateEmployee ,Upload, Getemployee, GetEmployees, UpdateEmployee
} from '../controllers/EmployeeController.js';
import Authmiddleware from '../middleware/authmiddleware.js';

const router = Express.Router();

router.post('/addemp',Authmiddleware,Upload.single('image'),CreateEmployee);
router.get('/getemp', Authmiddleware, GetEmployees);
router.get('/:id', Authmiddleware, Getemployee);
router.put('/:id', Authmiddleware, UpdateEmployee);




export default router;