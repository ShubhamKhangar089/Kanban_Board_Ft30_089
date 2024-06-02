import { Schema,model } from "mongoose";

const userSchema = new Schema({
    userName : {type:String, required : true},
    email : {type:String, required : true },
    password: { type: String, required: true },
    roles: { type: String, enum: ["admin", "user"], require:true},
},
{versionKey:false}
)

export const userModel = model("users", userSchema)

//two roles
//users, admin