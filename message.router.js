import express from 'express';
const Router = express.Router();
import authmiddleware from '../middleware/auth.middleware.js';
import { getUserforSlidebar , getmessage , sendmessage } from '../Controllers/message.controllers.js';


Router.get('/users' ,  authmiddleware , getUserforSlidebar);
Router.get('/:id' ,  authmiddleware , getmessage);

Router.post('/:id' ,  authmiddleware , sendmessage);
