import {connect} from "mongoose";

export const connectToDB = async(url)=>{
    try {
        await connect(url)
        console.log("connected to database");
    } catch (error) {
        console.log(error.message);
    }
}
