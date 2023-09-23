import express, { json } from "express";
import connect from "./connect.js";
import User from "./model/user.js";
import cors from "cors";
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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
            return res.status(503).json({"message":'Invalid Password'})
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
