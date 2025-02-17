const user  = require('../model/User');
const bcrypt =  require('bcrypt');
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.signup = async (req,res)=>{

    try{

        const {name , email , password , role} = req.body;

        const existingUser  = await user.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message:"User already exists",
            });
        }

        const hashPassword = await bcrypt.hash(password,10);

        console.log(password , " ", name);
        

        if(!hashPassword){
            return res.status(400).json({
                message:"Password hashing failed",
            });
        }

        const newUser = await user.create({
            name,
            email,
            password:hashPassword,
            role
        })

        return res.status(200).json({
            message : "User created Successfully",
            data : newUser
        })

    
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }


}




exports.login = async(req,res) =>{

    try{

        const {email , password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "Please enter All details carefully"
            })
        }

        let User = await user.findOne({email})

        if(!User){
            return res.status(401).json({
                success : false,
                message :" User Does not Exist"
            })
        }

        const payload = {
            email : User.email,
            id : User._id,
            role : User.role
        }
        

        if(await bcrypt.compare(password , User.password)){

            const token = jwt.sign(payload , 
                                    process.env.JWT_SECRET,
                                    {
                                        expiresIn :"2h"
                                    });

            User = User.toObject();                                    
            User.password = undefined;
            User.token = token;

            const options = {
                expires : new Date( Date.now() +  3*24*60*60*1000),
                httpOnly : true
            }
            
            res.cookie("token" , token , options).status(200).json({
                success : true,
                token,
                User,
                message : "user Login successfully"
            })

            
        }else{
            return res.status(400).json({
                success : false,
                message :"Password is Incorrect"
            })
        }



    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
        
    }
}