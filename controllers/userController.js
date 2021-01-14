const multer = require ('multer')
const helpers = require('../helpers');
const User = require("../models/users.js");

function validateUser(user) {
  const usersSchema = Joi.object({
    fullName: Joi.string().min(5).max(15).required(),
    phoneNumber: Joi.string().min(3).max(15).required(),
    email: Joi.string().min(5).max(45).required(),
    password: Joi.string().min(2).max(55).required(),
  });
  return usersSchema.validate(user, schema)
}

exports.postUser = async (req, res) => {
    const validation=validateUser(req.body)
    if (validation.error) {
      //400 bad request
      res.status(400).send(validation.error.details[0].message);
      return;
    }
    const user = new User({
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: req.body.password,
    });
  
    //whenever you use await, your code must be inside an asynch function
    const result = await user.save();
    console.log(result);
    res.send(result);
  }

 

exports.postProfilePic = (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');
  
    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
  
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
  
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
  } 

exports.getAllUsers =  async (req, res) => {
    const users = await User.find({});
    res.send(users);
  }

exports.getUser =  async (req, res) => {
    const user = await User.find({ _id: req.params.id });
    if (!user) {
      res.status(404).send("user not found");
    }
    res.send(user);
  }

exports.updateUser =  async (req, res) => {
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
  }

exports.deleteUser =  async (req, res) => {
    //check user and delete user
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send("An error occured! Seems user doesn't exist");
    }
    res.send(
      {user,
      message: 'successfully deleted'});
  }

