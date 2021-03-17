const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: {
    type:String,
    required:[true]
  },
  lastName: {
    type:String,
    required:[true]
  },
  phoneNumber: {
    type:Number,
    required: [true, 'please Enter a phone number']

  },
  email:{
    type:String,
    required:[true, 'An Email is required'],
    unique: true
  },
  password:{
    type:String,
    required:[true, 'A password is required']
  },
});

const User = mongoose.model("User", usersSchema)
module.exports =  User;



