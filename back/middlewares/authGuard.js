const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_TOKEN;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //cheack if has a token

  if (!token) return res.status(401).json({ errors: ["acesso negado!"] });

  //check is token valida
  try {
    const verified = jwt.verify(token, jwtsecret);
    req.user = await User.findById(verified.id).select("-password");
    console.log("token aceito");
    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token invalido!"] });
  }
};

module.exports = authGuard;
