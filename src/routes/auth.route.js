import express from 'express';
import {LoginUser, verify} from '../controllers/authController.js';

import  Authmiddleware  from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/login', LoginUser)
router.get('/verify', Authmiddleware, verify)


export default router;