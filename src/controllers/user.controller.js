import { userModel } from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const getAllUser= async(req,res)=>{
    try {
        const users =await userModel.find();
        res.status(200).send(users)
    } catch (error) {
        console.log("error while getAllUsers request");
        res.send("error :" ,error.message)
    }
}


//register
export const getUserRegister= async(req,res)=>{
    const {userName, email, password ,roles} = req.body;
    try {
        //check user already register or not
        const userExist = await userModel.findOne({email : email})
        if(userExist){
            return res.status(400)
            .json({message : "user with this email is present try to login..."})
        }

        //hashing password salting 5
        bcrypt.hash(password,5, async(err,result) =>{
            if(err) console.log(err.message);
            //update hash password to password filed
            const user = new userModel({userName, email, password : result, roles});
            await user.save();
            return res.status(201).json({message :"user registered successfully", user : user})
        });   
    } catch (error) {
        console.log("error while getUserRegister request");
        res.json({message : error.message})  
    }
}

//login
export const getUserLogin = async(req,res) =>{
    const {email, password} = req.body;
    try {
        //check user already login,register or not
        const existUser = await userModel.findOne({email : email});
        if(!existUser) return res.status(400).json({message: "users does not exist please register"});

        //if user has register compare password check
        const isMatch = bcrypt.compareSync(password, existUser.password);

        //password not correct
        if(!isMatch) return res.status(400).json({message:'Invalid Credentials'});

        //password correct generate token 
        const token = jwt.sign({id: existUser._id, role : existUser.roles} , "kanban" , {expiresIn : '1h'})
        console.log("from login req :", existUser.roles);
        //send response
        res.json({
            message :"user login successfully",
            token : token,
            user : {
                id : existUser._id,
                userName : existUser.userName,
                email : existUser.email,
                roles : existUser.roles,
            },
        });
    } 
    catch (error) {
        console.log("error while getUserLogin request");
        res.json({message : error.message})
    }
}

//delete users fin and delete by id
export const deleteUser = async(req,res)=>{
    const {id} = req.params;
    console.log(req.params);
    try {
       const deleteUser = await userModel.findByIdAndDelete({_id: id});
       res.status(200).json({message : "user has been deleted successfully"})
    } catch (error) {
        console.log("error while deleting user by id");
        res.json({message : error.message}) 
    }
}
