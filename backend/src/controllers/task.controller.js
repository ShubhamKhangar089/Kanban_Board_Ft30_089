import { taskModel } from "../models/taskModel.js";

//get
export const getAllTask = async(req,res)=>{
    try {
        const tasks =await taskModel.find();
        res.status(200).json({tasks : tasks})
    } catch (error) {
        console.log("error :", error.message);
        res.status(500).json({message : "error while making getTaskAll request"})
    }
}

//Get tasks by userId
export const getTasksByUserId = async (req, res) => {
    try {
      const tasks = await taskModel.find({ userId: req.params.userId });
      res.status(200).json({tasks : tasks});
    } catch (error) {
        console.log("error :", error.message);
        res.status(500).json({message : "error while making getTasksByUserId request"})
    }
  };

//post
export const addTask = async(req,res)=>{
    const { title, description,status, dueDate,userId} = req.body;
    try {
        const tasks =  new taskModel({ title, description,status, dueDate, userId});
        await tasks.save()
        res.status(201).json({message : "task has been created successfully",tasks : tasks})
    } catch (error) {
        console.log("error :", error.message);
        res.status(500).json({message : "error while making addTask request"})
    }
}

//patch
export const updateTask = async(req,res)=>{
    // const {id} = req.params;
    try {
        const tasks =  await taskModel.findByIdAndUpdate(req.params.id , req.body);
        res.status(200).json({message : "task updated successfully",tasks : tasks})
    } catch (error) {
        console.log("error :", error.message);
        res.status(500).json({message : "error while making updateTask request"})
    }
}


//delete
export const deleteTask = async(req,res)=>{
    const {id} = req.params;
    try {
        const tasks =  await taskModel.findByIdAndDelete({_id : id});
        res.status(200).json({message : "task deleted successfully"})
    } catch (error) {
        console.log("error :", error.message);
        res.status(500).json({message : "error while making updateTask request"})
    }
}