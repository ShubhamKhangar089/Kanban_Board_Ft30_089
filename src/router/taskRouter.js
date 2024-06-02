import express from 'express';
import { addTask, deleteTask, getAllTask, getTasksByUserId, updateTask } from '../controllers/task.controller.js';
import role_access from '../middleware/role.js';

const taskRouter = express.Router();
//get access for both role
taskRouter.get('/',role_access(["admin", "user"]),getAllTask);
//getAllTaskUnderUserId  
taskRouter.get('/:userId',role_access(["admin", "user"]), getTasksByUserId)
//add access for user admin only
taskRouter.post('/add',role_access(["admin", "user"]),addTask);
//update access for user only
taskRouter.patch('/update/:id',role_access(["admin", "user"]),updateTask);
//delete access to admin only
taskRouter.delete('/delete/:id',role_access(["admin"]),deleteTask);

export default taskRouter;