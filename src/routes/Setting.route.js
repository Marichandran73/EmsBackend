import Express from "express";
import { ChangePassword } from '../controllers/SettingController.js'
import Authmiddleware from '../middleware/authmiddleware.js';

const router =Express.Router();

router.put("/Password-change",Authmiddleware, ChangePassword);

export default router