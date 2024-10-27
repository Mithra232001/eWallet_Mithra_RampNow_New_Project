const User = require("./../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register method
exports.register = async (req, res) => {
  const { username, email, password, userid, userNo, balance } = req.body;
  console.log(req.body);

  try {
  
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    // return  res.status(400).json({ message: "User already exists" });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("rest", hashedPassword);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      userid,
      userNo,
      balance,
    });
    console.log("User Object Before Saving:", user);
    await user.save();
    console.log("user", user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//login method
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" } // Token expiration time
    );

    res
      .status(201)
      .json({ message: "User Logged in successfully", data: token });
  } catch (err) {}
};

exports.getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.password=" ";
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(201)
      .json({ message: "user details retrieved successfully", data: user });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {

    const user = await User.find();
    // user.password=" ";
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(201)
      .json({ message: "user details retrieved successfully", data: user });
  } catch (error) {
    console.log(error);
  }
};