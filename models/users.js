const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new mongoose.Schema({
  fullName: String, // String is shorthand for {type: String}
  phoneNumber: String,
  body: String,
  email: String,
  password: String,
});

module.exports =  mongoose.model("users", usersSchema)



