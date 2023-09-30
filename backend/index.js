import express, { json } from "express";
import connect from "./connect.js";
import User from "./model/user.js";
import cors from "cors";
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Hotels from "./model/room.js";
import Stripe from 'stripe';

const stripe = new Stripe('pk_live_51Nw9qUSCvvDElO2eiR2j1kc2pBRGD7523fNVvYOaq2W2sNKEPftQvnzClhK5yA6J4PpoA3D6bD7SUmrg5Kmbz6Kb00l7M5W0rK');


dotenv.config();


const app = express();
app.use(json());
app.use(cors());

app.get("/", async (req, res) => {
  await connect();
  const data = await User.find();
  res.json({
    message: "Running Successfully!!!",
    data: data
  });
});

app.get("/api/getHotels", async (req, res) => {
  await connect();
  const data = await Hotels.find();
  res.json({
    message: "Running Successfully!!!",
    data: data
  });
});

app.get("/api/getHotels/:id", async (req, res) => {
  await connect();
  const data = await Hotels.findById(req.params.id);
  res.json({
    message: "Running Successfully!!!",
    data: data
  });
});

app.post("/api/getDetails", async (req, res) => {
  const {token}=req.body;

  try{
    const getId=jwt.verify(token,process.env.JWT_SECRET);
    await connect();
    const result=await User.findById(getId.id)
    res.send(result)
  }catch(err){
    res.status(404).json({
      message:err.message
    })
  }
});

// booking rooms
app.post("/api/bookHotelRoom", async (req, res) => {
  const {hotelId,price,checkInDate,checkOutDate,userId,roomNumber}=req.body;
  try{
    await connect();
    const findUser=await User.findById(userId);
    if(findUser){
      const data={
        "id":userId,
        "hotelId":hotelId,
        "price":price,
        "checkInDate":checkInDate,
        "checkOutDate":checkOutDate,
        "roomNumber":roomNumber
      }
      const updateDetails=await User.findByIdAndUpdate(userId,{
        $push:{
          booking:data
        }
      })
      const updateHotelRoom=await Hotels.findByIdAndUpdate(hotelId,{
        $push:{
          bookedRooms:data
        }
      })
      res.status(202).json({
        "message":"You have Successfully Booked hotel Room",
      })
    }else{
      res.status(404).json({
        message:"User Not Found"
      })
    }

  }catch(err){
    res.status(404).json({
      message:err.message
    })
  }
});

// adding hotels

app.post("/api/addHotel", async (req, res) => {
  const {hotelName,description,thumbnail,price,totalRooms,roomType,city,state,country,address,phone,email}=req.body;

  try{
    await connect();
    const findHotel=await Hotels.findOne({
      hotelName: hotelName
    });
    if(!findHotel){
      const data=new Hotels({
        hotelName:hotelName,
        description:description,
        thumbnail:thumbnail,
        price:price,
        totalRooms:totalRooms,
        roomType:roomType,
        city:city,
        state:state,
        country:country,
        address:address,
        phone:phone,
        email:email
      })
      const result=await data.save();
      res.status(200).json({result:result,message:"success"});
    }else{
      res.status(409).json({
        message:"hotelName Already Exists."
      })
    }

  }catch(err){
    res.status(404).json({
      message:err.message
    })
  }
});

app.post("/auth/signUp", async (req, res) => {
  const { email, password, name } = req.body;
  await connect();

  try {
    const isUser = await User.findOne({
      email: email
    });

    if (!isUser) {
        const hashedPassword=await bcryptjs.hash(password,10);

      let user = new User({
        'email': email,
        'password': hashedPassword,
        'name': name
      });
      //save the record to database
      await user.save();
      return res.status(201).json({
        "message":"success"
      });
    }else{
        return  res.status(409).json({
            "message":"Email Already Exits."
        })
    }
  } catch (err) {
    console.log(err.message);
  }
});


app.post("/auth/signIn", async (req, res) => {
  const { email, password} = req.body;
  await connect();

  try {
    
    const isUser = await User.findOne({
        email: email,
    });

    if (!isUser) {
      return res.status(404).json({
        "message":"Account Not created yet"
      });
    }else{
        const pass=await bcryptjs.compare(password,isUser.password);
        if(!pass){
            return res.status(402).json({"message":'Invalid Password'})
        }else{
            const token=jwt.sign(
                {"id":isUser._id},
                process.env.JWT_SECRET,{expiresIn:'7d'}
            )
            return res.status(200).json({
                'token':token,
                "message":"Successfully logged in!"
            })
        }
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/auth/signInWithGoogle", async (req, res) => {
  const { email} = req.body;
  await connect();

  try {
    
    const isUser = await User.findOne({
        email: email,
    });

    if (!isUser) {
      return res.status(404).json({
        "message":"Account Not created yet"
      });
    }else{
        const token=jwt.sign(
            {"id":isUser._id},
            process.env.JWT_SECRET,{expiresIn:'7d'}
        )
        return res.status(200).json({
            'token':token,
            "message":"Successfully logged in!"
        })
}
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/auth/signInWithGithub", async (req, res) => {
  const { email} = req.body;
  await connect();

  try {
    
    const isUser = await User.findOne({
        email: email,
    });

    if (!isUser) {
      return res.status(404).json({
        "message":"Account Not created yet"
      });
    }else{
        const token=jwt.sign(
            {"id":isUser._id},
            process.env.JWT_SECRET,{expiresIn:'7d'}
        )
        return res.status(200).json({
            'token':token,
            "message":"Successfully logged in!"
        })
}
  } catch (err) {
    console.log(err.message);
  }
});



app.listen(5000, () => {
  console.log("Server is running in PORT");
});
