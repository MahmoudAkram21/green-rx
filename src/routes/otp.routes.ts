import express from 'express';
import { resendOtp, verifyOtp } from '../controllers/auth.controller';



const router = express.Router();


router.post('/resend', resendOtp);
router.post('/verify', verifyOtp);
export default router;