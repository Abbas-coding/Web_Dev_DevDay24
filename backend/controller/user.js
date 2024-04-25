const express = require('express');
const path = require('path');
const { upload } = require('../multer');
const User = require('../models/user');
const ErrorHandler = require('../utils/ErrorHandler');
const router = express.Router();
const fs = require('fs')
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const CatchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const cloudinary = require("cloudinary");

router.post('/create-user', async (req,res, next)=>{
    try{
    const { name , email, password} = req.body;
    const userEmail = await User.findOne({email});

    if (userEmail){
        return next(new ErrorHandler("User already exists", 400))
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar,{
      folder: "avatars",
    })
    
    const user= {
        name: name,
        email: email,
        password: password,
        avatar : {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
    }

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
        await sendMail({
            email: user.email,
            subject: "Activate your Account",
            message: `Hello ${user.name}, Please click on the link to activate your account: ${activationUrl}`
        })
        res.status(201).json({
            success:true,
            message: `please check your email:- ${user.email} to activate your account.`
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
    }catch(error){
        return next(new ErrorHandler(error.message, 400))
    }
});

// create Activation Token
    const createActivationToken = (user)=>{
        return jwt.sign(user, process.env.ACTIVATION_SECRET, {
            expiresIn: '5m',
        })
    }

    // activate user
    router.post('/activation', CatchAsyncErrors(async(req,res,next)=>{
        try {
            const {activation_token} = req.body;
            const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
            if(!newUser){
                return next(new ErrorHandler("Invalid token", 400))
            }
            const {name, email, password, avatar} = newUser;
            let user = await User.findOne({email});
            if(user){
                return next(new ErrorHandler("User with this email already exists", 400))
            }
            user = await User.create({
                name, 
                email,
                password,
                avatar,
            });
            sendToken(user, 201, res);     
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))

// login user
router.post('/login-user', catchAsyncErrors(async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return next(new ErrorHandler("Please provide all the fields", 400))
        }
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorHandler("User with this email doesn't exists", 400))
        }
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return next(new ErrorHandler("Invalid Passowrd",400));
        }
        sendToken(user,201, res)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
        }
    })
    )

// load user
router.get("/getuser", isAuthenticated, catchAsyncErrors(async(req,res,next) =>{
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return next(new ErrorHandler("User doesn't exists", 400));
        }
        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
}))

// log out user
router.get(
    "/logout",
    catchAsyncErrors(async (req, res, next) => {
      try {
        res.cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        });
        res.status(201).json({
          success: true,
          message: "Log out successful!",
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  
  // find user information with the userId
  router.get(
    "/user-info/:id",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const user = await User.findById(req.params.id);
  
        res.status(201).json({
          success: true,
          user,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  // all users --- for admin
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete users --- admin
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler("User is not available with this id", 400)
        );
      }

      await User.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "User deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;