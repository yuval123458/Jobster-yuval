const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const CheckAuth = require("../CheckAuth");

const router = express.Router();

router.get("/getUser", CheckAuth, async (req, res) => {
  try {
    let user = await User.findById(req.userId);

    return res.status(201).send({ user: user });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!(name && email && password.length > 5)) {
      return res.status(400).send({ msg: "All input is required" });
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send({ msg: "user already exists, try to login" });
    }
    let hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashed,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1000h",
    });

    return res.status(201).json({ token: token, user: newUser });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let existing = await User.findOne({ email });

    console.log(existing);

    if (!existing) {
      return res
        .status(401)
        .send({ msg: "Invalid email address, please try again " });
    }
    const valid = await bcrypt.compare(password, existing.password);

    if (existing.email === "testUser@gmail.com" && valid) {
      const token = jwt.sign(
        { userId: existing._id, test: true },
        process.env.JWT_SECRET,
        {
          expiresIn: "1000h",
        }
      );

      return res.status(201).json({ token: token, user: existing });
    }

    if (!valid) {
      return res
        .status(403)
        .send({ msg: "Invalid password, please try again" });
    }

    const token = jwt.sign({ userId: existing._id }, process.env.JWT_SECRET, {
      expiresIn: "1000h",
    });

    return res.status(201).json({ token: token, user: existing });
  } catch (error) {
    return res.status(500).send("server error");
  }
});

router.patch("/update", CheckAuth, async (req, res) => {
  const { name, lastName, email, location } = req.body;

  try {
    if (!name || !email || !location || !lastName) {
      return res.status(401).send({ msg: "Please fill in all fields" });
    }
    let user = await User.findById(req.userId).select("-password");

    if (!user) {
      throw new Error("no user found");
      return;
    }

    const existingEmail = await User.findOne({ email });

    if (JSON.stringify(existingEmail._id) !== JSON.stringify(req.userId)) {
      return res.status(409).send({ msg: "email field has to be unique" });
    }

    if (lastName !== "lastName") {
      user.name = name + " " + lastName;
    } else {
      user.name = name;
    }

    user.email = email;
    user.location = location;

    await user.save();

    return res.status(201).send({ user: user });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});

module.exports = router;
