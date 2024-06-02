import { userModel } from "../models/userModel.js";

const role_access = (roles = []) => {
    return async (req, res, next) => {
        console.log("role_access :", req.user.role);
        try {
            // Check if req.user is null or undefined
            if(!req.user || !req.user.role){
                return res.status(401).json({ message: "User not authenticated or roles not provided" });
            }

            // Check if user has any of the specified roles
            const userHasRole = roles.some(role => req.user.role.includes(role));
            
            if (userHasRole) {
                // User has the required role, proceed to the next middleware
                next();
            } else {
                // User doesn't have the required role, send forbidden error
                return res.status(403).json({ message: "You don't have access to perform this action." });
            }
        } catch (error) {
            console.error("Error in role_access middleware:", error.message);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
};


export default role_access;



// import { userModel } from "../models/userModel.js"

// const role_access = (roles = []) =>{
//     if (typeof roles === "string"){
//         roles = [roles];
//     }
//     return async(req,res,next) => {
//         console.log(req.user.email);
//         const currentUser = await userModel.findOne({email : req.user.email});
//         if(!roles.length || currentUser.roles.includes(req.user.roles)){
//             next();
//         }
//         else{
//             return res.status(403).json({message : "You cant handle this action don't have access"})
//         }
//     }
// }

// export default role_access;