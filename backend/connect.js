import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const URL=process.env.MONGO_URL;

const connect=async()=>{
    try{
        await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to Database...")
    }catch(err){
        console.log(err.message);
    }
    
}

export default connect;