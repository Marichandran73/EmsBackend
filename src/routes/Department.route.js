import express from 'express';
import {
  CreateDepartment,
  GetDepartments,
  GetDepartment,
  UpdateDepartment,
  DeleteDepartment
} from '../controllers/DepartmentController.js';
import Authmiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', Authmiddleware, GetDepartments);
router.post('/adddep', Authmiddleware, CreateDepartment);
router.get('/:id', Authmiddleware, GetDepartment);
router.put('/:id', Authmiddleware, UpdateDepartment);
router.delete('/:id', Authmiddleware, DeleteDepartment);

export default router;
