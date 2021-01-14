const express = require ("express")
const app = require("../server")
const router = express.Router()
const { getUser, postUser, getAllUsers, updateUser, deleteUser, postProfilePic } = require("../controllers/userController");

  
//router.route("/upload-profile-pic").post(postProfilePic );

router.route('/')
  .post(postUser)
  .get(getAllUsers)

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);


module.exports = router