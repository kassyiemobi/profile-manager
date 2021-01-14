const express = require("express");
const mongoose = require("mongoose");
const Joi = require("Joi");
const { schema } = require("./models/users.js");
const userRouter = require("./routes/userRoute")

//build the server
const app = express();
//const router = express.Router()

app.use(express.json());
app.use(express.static(__dirname + '/public'))
app.use('/users', userRouter)

//initialize server
app.listen(3030, () => {
  //initializing mongodb
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  mongoose
    .connect("mongodb://localhost:27017/usersdatabase", { ...options })
    .then(() => console.log("connected to MongoDB..."))
    .catch((err) => console.error("could not connect to MongoDB..."));
  console.log("server is running");
});

module.exports = app