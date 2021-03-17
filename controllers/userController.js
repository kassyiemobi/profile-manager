const multer = require ('multer')
const helpers = require('../helpers');
const User = require("../models/userModel.js");
const AppError = require('./../utils/AppError')
const catchAsynch = require("./../utils/catchAsync")

// function validateUser(user) {
//   const usersSchema = Joi.object({
//     fullName: Joi.string().min(5).max(15).required(),
//     phoneNumber: Joi.string().min(3).max(15).required(),
//     email: Joi.string().min(5).max(45).required(),
//     password: Joi.string().min(2).max(55).required(),
//   });
//   return usersSchema.validate(user, schema)
// }

exports.createUser = catchAsynch (async (req, res,next) => {
  const newUser = await new User.create(req.body)
    res.status(200).json({
      status:'success',
      data :{
        newUser
    }
  });
  });


exports.getAllUsers = catchAsynch (async (req, res, next ) => {
  const users = await User.find();

  res.status(200).json({
    status:'success',
    result:users.lenght,
    data :{
      users,
     }
  });
});

exports.getUser =  catchAsynch (async (req, res, next) => {
  const user = await User.findbyId(req.params.id);
  if (!user){
    return new AppError('user not found',400)
  }
  res.status(200).json({
    status:'success',
    data:{
       user,
    }
  });
  });

exports.updateUser = catchAsynch (async (req, res) => {
    //find user
    const user = await User.find({ _id: req.params.id });
    if (!user) {
      res.status(404).send("user not found");
    }
    //validate user
    const validation=validateUser(req.body)
    if (validation.error) {
      //400 bad request
      res.status(400).send(validation.error.details[0].message);
      return;
    }
  
    //update user
  
    user.fullName= req.body.fullName,
    user.phoneNumber=req.body.phoneNumber,
    user.email= req.body.email,
    user.password= req.body.password,
    
    res.send(user);
  });

exports.deleteUser =  catchAsynch (async (req, res) => {
    //check user and delete user
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send("An error occured! Seems user doesn't exist");
    }
    res.send(
      {user,
      message: 'successfully deleted'});
  });

