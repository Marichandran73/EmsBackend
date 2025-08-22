import Express from 'express';
import {
    AddLeave ,GetLeavesByUserId, GetLeaves ,GetDetails, UpdateStatus
} from '../controllers/LeaveController.js';
import Authmiddleware from '../middleware/authmiddleware.js';

const router = Express.Router();

router.post('/addLeave',Authmiddleware, AddLeave);
router.get('/getLeave/:id',Authmiddleware, GetLeavesByUserId);
router.get('/AllLeaves',Authmiddleware, GetLeaves);
router.get('/getDetails/:id',Authmiddleware, GetDetails);
router.put('/UpdateStatus/:id',Authmiddleware, UpdateStatus);






export default router;