
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = async (req , res ,next) =>{

    try{

        // extract jwt token

        console.log("cookie " , req.cookies.token);
        console.log("body " , req.body.token);
        console.log("header " , req.header("Authorization"));
        

        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer " ,"");

        
        if(!token){
            return res.status(401).json({
                success : false,
                message : "token Not Found"
            })
        }

        try{

            const decode = jwt.verify(token , process.env.JWT_SECRET)
            // console.log(decode);

            req.User = decode;
            

        }catch(err){
            return res.status(401).json({
                success : false,
                message : "token is invalid" 
            })      
        }

        next();

    }catch(err){
        console.error(err);
        return res.status(401).json({
            success : false,
            message : "Auth is Failed" 
        })
        
    }
    
}


exports.isStudent = (req,res,next) =>{

    try{

        if(req.User.role !== "Student"){
            return res.status(401).json({
                success : false,
                message : "You are not Allow for this Site - This is the Protected Route for Student  " 
            })
        }
        next();

    }catch(err){
        console.error(err);
        return res.status(401).json({
            success : false,
            message : "User role is Missing" 
        })
    }
}



exports.isAdmin = (req,res,next) =>{

    try{

        if(req.User.role !== "Admin"){
            return res.status(401).json({
                success : false,
                message : "You are not Allow for this Site - This is the Protected Route for Admin" 
            })
        }
        next();

    }catch(err){
        console.error(err);
        return res.status(401).json({
            success : false,
            message : "User role is Missing" 
        })
    }
}