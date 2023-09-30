import mongoose from "mongoose";

const HotelsSchema=new mongoose.Schema({
    hotelName:{
        type:String,
        unique:true,
        required:[true,'Name is required'],
    },
    description:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        default:0,
    },
    reviews:{
        type:Number,
        default:0,
    },
    totalRooms:{
        type:Number,
        required:true,
    },
    roomType:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    bookedRooms:{
        type:[],
    }

},{timestamps:true})

const Hotels = mongoose.model("Hotels", HotelsSchema);

export default Hotels;
