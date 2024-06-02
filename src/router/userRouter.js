import express from 'express';
import { deleteUser, getAllUser, getUserLogin, getUserRegister } from '../controllers/user.controller.js';
import role_access from '../middleware/role.js';
import auth from '../middleware/auth.js';

const userRouter = express.Router();

//getAllUser list role admin access
userRouter.get('/',auth ,role_access(["admin"]), getAllUser);

//register adding user to database post req
userRouter.post('/register', getUserRegister); 

//login
userRouter.post('/login', getUserLogin);

//if logged in as admin then only give access to delete users
userRouter.delete('/:id' , deleteUser);


export default userRouter;