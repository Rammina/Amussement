require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const SECRETKEY = process.env.SECRETKEY;

// import all the mongoose models
const User = require("../models/user");

// const { body, validationResult } = require("express-validator/check");
// const { sanitizeBody } = require("express-validator/filter");

const async = require("async");
const multer = require("multer");
const path = require("path");

// set storage engine
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(/jpeg|jpg|png|gif/, file, cb);
  },
}).single("shoesImage");

// check file type
const checkFileType = (regexp, file, cb) => {
  // check extension type
  const extname = regexp.test(path.extname(file.originalname).toLowerCase());
  // check mimetype
  const mimetype = regexp.test(file.mimetype);

  // check if both are true
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
};

// retrieve user information upon application loading
exports.user_load = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("User does not exist");
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

// Handle user create/register on POST.
exports.user_register = async (req, res) => {
  const { email, username, password, date_of_birth } = req.body;
  console.log(req.body);
  let errors = [];

  // check if any of the following fields are empty
  if (!username || !email || !password || !date_of_birth) {
    errors.push({ msg: "Please fill in all the fields." });
  }

  // minimum length for the password
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const emailLowerCase = email.toLowerCase();
      // check if e-mail is already taken
      const user = await User.findOne({ email: e - emailLowerCase });
      if (user) throw Error("Email is already taken.");
      // check if salt generation has any errors
      const salt = await bcrypt.genSalt(10);
      if (!salt)
        throw Error("Something went wrong with encrypting the password.");
      // check if hashing the password has any errors
      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error("Something went wrong hashing the password.");
      console.log(SECRETKEY);

      const newUser = new User({
        email: emailLowerCase,
        username,
        password: hash,
        date_of_birth,
      });
      const savedUser = await newUser.save();
      if (!savedUser) throw Error("Failed to register the user.");
      // synchronous signing of JWT token

      const token = jwt.sign({ id: savedUser._id }, SECRETKEY, {
        expiresIn: 28800,
      });

      console.log(token);
      console.log(savedUser);
      res.status(200).json({
        token,
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email.toLowerCase(),
        },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.user_login = async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const emailLowerCase = email.toLowerCase();
    // Check for existing user
    const user = await User.findOne({ email: emailLowerCase });
    if (!user) throw Error("User does not exist.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid credentials.");

    const token = jwt.sign({ id: user._id }, SECRETKEY, { expiresIn: 3600 });
    if (!token) throw Error("Could not sign the token.");

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.username,
        email: user.emailLowerCase,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

exports.user_edit_account = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(req.body);
  let errors = [];

  // check if any of the following fields are empty
  if (!username || !email || !password) {
    errors.push({ msg: "Please fill in all the fields." });
  }

  // minimum length for the password
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const emailLowerCase = email.toLowerCase();

      const user = await User.findById(req.params.id);
      if (!user) throw Error("User does not exist.");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error("Invalid credentials.");
      /*
      const newUser = new User({
        email: emailLowerCase,
        username,
        password: user.password,
        date_of_birth: user.date_of_birth
      });
*/
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            email: emailLowerCase,
            username,
          },
        },
        {
          new: true,
        }
      );
      if (!updatedUser) throw Error("Failed to update the user.");
      console.log(updatedUser);

      res.status(200).json({
        user: {
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email.toLowerCase(),
        },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

// handle user deletion
exports.user_delete = async (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.remove().then(() => {
        res.json({ success: true });
      });
    })
    .catch((error) => {
      res.status(404).json({ success: false });
    });
};
