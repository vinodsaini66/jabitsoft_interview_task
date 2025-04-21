require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { body, validationResult, query } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require('./model/User');
const { log } = require('console');
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.PORT || "QAZXSWDECGGGTYH";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const connectToMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MongoDB URI not provided in environment variables');
    }
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database Connected');
  } catch (error) {
    console.error('Connection error:', error);
  }
};

connectToMongoDB();

const Auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  console.log("Token: ", token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const email = decoded.email;
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    req.user.id = user._id;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const ValidateRequest = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next()
    }

    const errors = result.array().map((item) => ({
      message: item.msg,
      field: item.param
    }))
    return res.status(400).json({ errors: errors });

  } catch (err) {
    return next(err);
  }
}

app.post(
  "/api/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Enter a valid email"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  ValidateRequest,
  async (req, res) => {

    const { email, password } = req.body;

    try {

      const user = await User.findOne({ email }).lean();

      if (!user) {
        return res.status(401).json({ status: false, message: "Invalid Email" });
      }

      console.log(user);

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ status: false, message: "Invalid Password" });
      }


      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      return res.status(200).json({ status: true, token, user });

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

app.post(
  "/api/signup",
  [
    body("email").isEmail().normalizeEmail().withMessage("Enter a valid email"),
    body("name").notEmpty().withMessage("Enter a valid name"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  ValidateRequest,
  async (req, res) => {

    const { email, password, name } = req.body;

    try {

      const existing = await User.findOne({ email }).lean();

      if (existing) return res.status(400).json({ message: "User already exists with this email" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        name,
        password: hashedPassword,
      });

      await newUser.save();

      const token = jwt.sign(
        {
          id: newUser._id,
          email: newUser.email,
          name: newUser.name,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });


      return res.status(201).json({
        status: true,
        message: "User registered successfully",
        token,
        user: newUser
      });

    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

app.get('/api/user', Auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ status: true, user });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.get('/logout', Auth, async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });


    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(express.static('public'));

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
