const express = require ("express")
const app = require('./../app')
const router = express.Router()

  
//router.route("/upload-profile-pic").post(postProfilePic );

router.route('/')
  .post(postUser)
  .get(getAllUsers)

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);


module.exports = router