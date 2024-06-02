import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
    title: {type: String, required: true},
    description: {type : String},
    status: {type: String, enum: ['to-do', 'in-progress', 'done'],default: 'to-do'},
    dueDate: {type : Date ,default: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), require:true},
    userId : {type: Schema.Types.ObjectId, ref: 'users', required: true} 
},
{versionKey:false});

export const taskModel = model('task', TaskSchema);