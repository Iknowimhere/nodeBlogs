const {Schema,model}=require("mongoose")
const validator=require("validator")

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"name field cant be empty"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"email field cant be empty"],
        lowercase:true,
        unique:true,
        validate:[validator.isEmail,"enter proper email"]
    },
    role:{
        type:String,
        enum:["user","admin","author"],
        default:"admin"
    },
    password:{
        type:String,
        required:[true,"password field cant be empty"],
        minlength:[8,"password should contain above 8 characters"]
    },
    confirmPassword:{
        type:String,
        required:[true,"Confirm password field cant be empty"],
        //custom validation
        validate:{
            validator:function(value){
                    return this.password===value;
                },
            message:"password doesnt match"
        }
    },
    
},{
    timestamps:true
})


module.exports=model("user",userSchema);