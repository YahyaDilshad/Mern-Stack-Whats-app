import express from "express";
const router = express.Router()
import { checkauth, login, logout, signup , updateprofile } from "../Controllers/auth.controllers.js";
import  authmiddleware from "../middleware/auth.middleware.js";
import { body } from 'express-validator'

router.post('/signup' ,[
 body('fullname').isLength({ min: 3 }).withMessage('fullname must be at least 3 characters long'),
 body('email').isEmail().withMessage('Invalid email'),
 body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
] , signup )

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], login)

router.post('/logout' , logout)

router.put('/update_profile' , authmiddleware.protectroute , updateprofile )
router.get('/check' , authmiddleware.protectroute , checkauth )

export default router