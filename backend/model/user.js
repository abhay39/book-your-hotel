import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,'Name is required'],
    },
    email:{
        type : String ,  
        unique : true , 
        lowercase : true , 
        required:[true,"Email id is required"],
    },
    password:{
        type : String  ,
        required : [true ,"Password field is required"]
    },
    profilePic:{
        type:String,
        default:'https://th.bing.com/th/id/R.7ea4af7d8401d2b43ee841bfa2abe89d?rik=xidyUKdveUKULQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-download-icons-logos-emojis-users-2240.png&ehk=2%2bOqgdMZqFkKaBclc%2fPL9B86vLju3iBGiFmH64kXaTM%3d&risl=&pid=ImgRaw&r=0',
    },
    booking:{
        type:[{}],
    },

},{timestamps:true})

const User = mongoose.model("User", UserSchema);

export default User;
