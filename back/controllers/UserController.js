const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_TOKEN;

//generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

//register user and sign in
const register = async (req, res) => {
  const { name, email, password, bio, userImage } = req.body;

  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(422).json({ errors: ["Por favor, use outro email!"] });
  }

  // generate password hash
  const salt = await bcrypt.genSalt();
  const passHash = await bcrypt.hash(password, salt);

  // create new user
  const newUser = await User.create({
    name,
    email,
    password: passHash,
    bio,
  });

  if (!newUser) {
    return res.status(500).json({ errors: ["Houve algum erro!"] });
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ errors: ["Usuario inexistente!"] });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(422).json({ errors: ["Senha invalida"] });
  }

  res.status(201).json({
    _id: user._id,
    userImage: user.userImage,
    token: generateToken(user._id),
  });
};

// get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};

// update user
const update = async (req, res) => {
  const { name, password, bio } = req.body;
  let userImage = null;

  if (req.file) {
    userImage = req.file.filename;
  }

  const user = await User.findById(req.user._id).select("-password");

  if (name) {
    user.name = name;
  }

  if (password) {
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);
    user.password = passHash;
  }

  if (userImage) {
    user.userImage = userImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();
  res.status(200).json(user);
};

// get user by Id
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ errors: ["Usuario nao encontrado"] });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errors: ["Erro interno do servidor"] });
  }
};

module.exports = {
  register,
  login,
  update,
  getCurrentUser,
  getUserById,
};
