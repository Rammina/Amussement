require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { cloudinary } = require("../utils/cloudinary");
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
  console.log("loading user");
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("rooms")
      .populate({
        path: "active_dm_rooms",
        populate: [{ path: "members", populate: { path: "user" } }],
      });
    // .populate("active_dm_rooms");
    // .populate("friends");
    if (!user) throw Error("User does not exist");
    User.getFriends(
      user,
      {},
      null,
      {
        sort: { username: 1 },
      },
      (err, friends) => {
        if (err) throw Error(err);
        console.log(friends);
        res.status(200).json({
          user: {
            _id: user._id,
            username: user.username,
            friends: friends || [],
            // rooms: user.rooms || [],
            // active_dm_rooms: user.active_dm_rooms || [],
            email: user.email,
            image_url: user.image_url || "",
            disabled: false,
          },
          rooms: user.rooms || [],
          dmRooms: user.active_dm_rooms || [],
        });
      }
    );
  } catch (e) {
    console.log("loading user success");
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
      const user = await User.findOne({ email: emailLowerCase });
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
      //
      console.log(token);
      console.log(savedUser);
      res.status(200).json({
        token,
        user: {
          _id: savedUser._id,
          username: savedUser.username,
          friends: [],

          email: savedUser.email.toLowerCase(),
          image_url: "",
        },
        rooms: [],
        dmRooms: [],
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
    const user = await User.findOne({ email: emailLowerCase })
      .populate("rooms")
      .populate({
        path: "active_dm_rooms",
        populate: [{ path: "members", populate: { path: "user" } }],
      });
    if (!user) throw Error("User does not exist.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid credentials.");

    const token = jwt.sign({ id: user._id }, SECRETKEY, { expiresIn: 28800 });
    if (!token) throw Error("Could not sign the token.");

    User.getFriends(
      user,
      {},
      null,
      {
        sort: { username: 1 },
      },
      (err, friends) => {
        if (err) throw Error(err);
        console.log(friends);
        res.status(200).json({
          token,
          user: {
            _id: user._id,
            username: user.username,
            friends: friends || [],
            // rooms: user.rooms || [],
            email: user.email,
            image_url: user.image_url || "",
            disabled: false,
          },
          rooms: user.rooms || [],
          dmRooms: user.active_dm_rooms || [],
        });
      }
    );
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

exports.user_upload_avatar = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "amussement_setups",
      public_id: `${req.params.id}-user-avatar`,
    });

    const avatarUrl = uploadedResponse.secure_url;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          image_url: avatarUrl,
        },
      },
      {
        new: true,
      }
    );
    if (!updatedUser) throw Error("Failed to update the user.");
    console.log("succeeded in uploading the avatar");
    res.status(200).json({
      user: {
        image_url: uploadedResponse.secure_url,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e.message });
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

exports.user_change_password = async (req, res) => {
  const { password, new_password, new_password_2 } = req.body;
  console.log(req.body);
  let errors = [];

  // check if any of the following fields are empty
  if (!password || !new_password || !new_password_2) {
    errors.push({ msg: "Please fill in all the fields." });
  }

  // minimum length for the password
  if (
    password.length < 6 ||
    new_password.length < 6 ||
    new_password_2.length < 6
  ) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  // check if the password confirmation matches
  if (new_password !== new_password_2) {
    errors.push({ msg: "Password confirmation does not match." });
  }

  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const user = await User.findById(req.params.id);
      if (!user) throw Error("User does not exist.");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error("Invalid credentials.");

      // check if salt generation has any errors
      const salt = await bcrypt.genSalt(10);
      if (!salt)
        throw Error("Something went wrong with encrypting the password.");
      // check if hashing the password has any errors
      const hash = await bcrypt.hash(new_password, salt);
      if (!hash) throw Error("Something went wrong hashing the password.");
      console.log(SECRETKEY);

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            password: hash,
          },
        },
        {
          new: true,
        }
      );
      if (!updatedUser) throw Error("Failed to update the user.");
      console.log(updatedUser);
      res.status(200).json({
        user: {},
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.user_remove_avatar = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          image_url: "",
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
        image_url: "",
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

exports.user_disable_account = async (req, res) => {
  const { password } = req.body;
  console.log(req.body);
  let errors = [];

  // check if any of the following fields are empty
  if (!password) {
    errors.push({ msg: "Please fill in the password field." });
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
      const user = await User.findById(req.params.id);
      if (!user) throw Error("User does not exist.");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error("Invalid credentials.");

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            disabled: true,
          },
        },
        {
          new: true,
        }
      );
      if (!updatedUser) throw Error("Failed to update the user.");
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.user_delete_account = async (req, res) => {
  const { password } = req.body;
  // console.log(req);
  // console.log(req.data);
  // console.log(req.body);
  console.log("430 delete account;");
  let errors = [];

  // check if any of the following fields are empty
  if (!password) {
    errors.push({ msg: "Please fill in the password field." });
  }
  console.log(password);
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
      const user = await User.findById(req.params.id);
      if (!user) throw Error("User does not exist.");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error("Invalid credentials.");

      User.findById(req.params.id)
        .then((user) => {
          user.remove().then(() => {
            res.status(200).json({ success: true });
          });
        })
        .catch((e) => {
          res.status(400).json({ msg: e.message });
        });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};
