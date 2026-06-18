const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({
            message: "User Registered Successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }
       const token = jwt.sign(
  {
    userId: user._id
  },
  "mysecretkey",
  {
    expiresIn: "1d"
  }
);

res.json({
  message: "Login Successful",
  token
});
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});
module.exports = router;