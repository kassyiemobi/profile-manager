const express = require("express");
const app = express();


const userRouter = require("./routes/userRoute");

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use("/users", userRouter);


module.exports = app;