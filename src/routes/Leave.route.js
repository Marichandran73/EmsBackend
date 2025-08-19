import Express from 'express';
import {
    AddLeave ,GetLeavesByUserId, GetLeaves
} from '../controllers/LeaveController.js';
import Authmiddleware from '../middleware/authmiddleware.js';

const router = Express.Router();

router.post('/addLeave',Authmiddleware, AddLeave);
router.get('/getLeave/:id',Authmiddleware, GetLeavesByUserId);
router.get('/AllLeaves',Authmiddleware, GetLeaves);






export default router;