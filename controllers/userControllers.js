const User=require("../models/User")
const signup=async (req,res)=>{
    try {
        //verify if user is present already
        const existingUser=await User.findOne({email:req.body.email})
        if(existingUser){
            return res.status(401).json({
                status:'fail',
                message:"user exists already,try logging in"
            })
        }
        const newUser=await User.create(req.body)
        res.status(201).json({
            status:'success',
            data:{
                newUser
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

module.exports={
    signup
}