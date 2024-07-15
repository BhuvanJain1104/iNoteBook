const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const JWT_SECRET = "Bhuvanisgoodb$oy";
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

//ROUTE 1 : Create a user using : POST "api/auth/createuser". No Login Require
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }).withMessage("Invalid Name"),
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password should be of minimum 5 characters"),
  ],

  async (req, res) => {
    let success = false;
    // If there are errors return Bad Request and Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // Check whether the user with this email exsists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false
        return res.status(400).json({ errors: "Sorry user with this email exsists already" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);

      // res.json(user);
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);







// ROUTE 2 : Authenticate a user using : POST "api/auth/login". No Login Require
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password").exists().withMessage("Password Cannot be Blank"),
  ],

  async (req, res) => {
    let success = false;
    // If there are errors return Bad Request and Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res.status(400).json({ success, error: "Please Login with valid Email and Password" });

      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ success, error: "Please Login with valid Email and Password" });

      }
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occured");
    }


  }
);




//ROUTE 3: Get LoggedIn user details using:POST "/api/auth/getuser". Login Required
router.post(
  "/getuser", fetchUser,
  async (req, res) => {
    try {
      user = req.user.id;
      const user = await User.findById(user).select("-password");
      res.send(user)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  })
module.exports = router;
