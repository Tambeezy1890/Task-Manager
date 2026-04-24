import {Router} from 'express'
import { signup } from '../controllers/auth.controller.js';

const authRoutes = Router();

authRoutes.post('/signup',signup);
authRoutes.post('/login',()=>null);
authRoutes.get('/user',()=>null);
authRoutes.get('/',()=>null);

export default authRoutes;