const express = require ("express")
const app = require('./../app')
const userController= require('./../controllers/userController')
const router = express.Router()


  
//router.route("/upload-profile-pic").post(postProfilePic );

router.route('/')
  .post(userController.createUser)
  .get(userController.getAllUsers)

router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);


module.exports = router