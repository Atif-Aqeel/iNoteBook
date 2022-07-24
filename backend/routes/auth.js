//import express in node js as import=const
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'AtifIsA$Boy'


//ROUTE-1: Creat a User using: POST "/api/auth/createuser" . Doesnot require auth/login
router.post("/createuser", [
  body("name", "Enter a valid Name").isLength({ min: 3 }),
  body("email", "Enter a valid Email").isEmail(),
  body("password", "Enter Password - atleast 5 characters ").isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  //if there are errors, then return bad request(400) & the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    //check whether the user with same email exit already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, error: "Sorry! User with this email already exits" })
    }
    //genSalt() func used to generate salt/some hash with the password hash
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //if not exit then create a New User 
    user = await User.create({
      name: req.body.name,
      //password: req.body.password,
      password: secPass,
      email: req.body.email,
    })
    // data method is for to get users id for user
    const data = {
      user: {
        id: user.id
      }
    }
    // token takes jwt.sign function which takes data and some secret jwt code
    const token = jwt.sign(data, JWT_SECRET);
    // instead of send (user), we send token to user
    success = true;
    res.json({success, token });
    // res.json(user);
    // this res for successfully creation of user and display a user details
    //   res.json({
    //     error: "Please Enter Valid Values for Email",
    //     message: err.message,
    //   });

  } catch (error) {
    // put in logger or SQS or console etc...
    console.error(error.messages);
    res.status(500).send("Internal Server Error...")
  }
}
);


//ROUTE-2: Authenticate a User using: POST "/api/auth/login" . no login required
router.post("/login", [
  body("email", "Enter a valid Email").isEmail(),
  body("password", "Password cannot be blank ").exists(),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  // fetch email and oassword from the body
  const { email, password } = req.body;
  try {
    //chech wheather the email exists or not
    let user = await User.findOne({ email });
    //if not exists then send bad request and some erroes 
    if (!user) {
      return res.status(400).json({success, error: "Invalid Credentials!!!" });
    }

    //compare password by bcrypt with user's password
    const comparePassword = await bcrypt.compare(password, user.password);
    //if not match thne send some error messages
    if (!comparePassword) {
      let success = false;
      return res.status(400).json({success, error: "Invalid Credentials!!!" });
    }
    // if password compare then send of payload(data of user)
    // const payload = {
    //   user:{
    //     id: user.id
    //   }
    // }
    const data = {
      user: {
        id: user.id
      }
    }
    // token takes jwt.sign function which takes data and some secret jwt code
    const token = jwt.sign(data, JWT_SECRET);
    // instead of send (user), we send token to user
    success = true
    res.json({success, token });

  } catch (error) {
    // put in logger or SQS or console etc...
    console.error(error.messages);
    res.status(500).send("Internal Server Error...")

  }

})


//ROUTE-3: Get Loggedin User details using: POST "/api/auth/getuser" . Login required
//get a token from user and varify it 
//fetchuser is a middleware that runs when a req called
router.post("/getuser",fetchuser ,  async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    // put in logger or SQS or console etc...
    console.error(error.messages);
    res.status(500).send("Internal Server Error...")
  }

})

module.exports = router;
