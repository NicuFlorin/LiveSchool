const bcrypt = require("bcrypt");
const { entities } = require("../database");
const config = require("../config.json");
const { OAuth2Client } = require("google-auth-library");
const googleClientId = config.googleLogin.clientId;
const googleClient = new OAuth2Client(googleClientId);

const loginChecker = (req, res, next) => {
  // activat/dezactivat
  //next(); return;

  if (
    !req.session.userId &&
    !config.login.unprotectedUrls.includes(req.originalUrl)
  ) {
    res.cookie("isLoggedIn", {}, { maxAge: 0, httpOnly: false });
    res
      .status(403)
      .send({ message: "You don't have access here. Please log in" });
  } else if (req.session.userId) {
    res.cookie("isLoggedIn", {}, { httpOnly: false });
    next();
  } else {
    res.cookie("isLoggedIn", {}, { maxAge: 0, httpOnly: false });
    next();
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;
    const found = await entities.Utilizator.findOne({
      where: {
        email: user.email,
      },
    });
    if (found) {
      const validPassword = await bcrypt.compare(user.parola, found.parola);
      if (validPassword) {
        req.session.userId = found.id;
        res.cookie("isLoggedIn", {}, { httpOnly: false });
        res.cookie("tip_utilizator", found.tip_utilizator);
        res.status(200).send({ userId: found.id });
        return;
      }
    }
    res.status(400).send({ message: "Invalid email or password" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.status(200).send({ message: "Successfully logged out" });
};

const isLoggedIn = async (req, res) => {
  try {
    if (req.session.userId) {
      const user = await entities.Utilizator.findOne({
        where: {
          id: req.session.userId,
        },
      });
      if (user) {
        res.status(200).send({ result: true, user: user });
      } else {
        req.session.destroy();
        res.status(200).send({ result: false, message: "nu exista" });
      }
    } else {
      res.status(200).send({ result: false, message: "logged out" });
    }
  } catch (err) {
    res.status(500).send({ result: false, message: err.message });
  }
};
module.exports = { loginChecker, isLoggedIn, logout, login };
