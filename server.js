
const mongoose = require("mongoose")


//build the server
const app = require('./app');
//const router = express.Router()


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
