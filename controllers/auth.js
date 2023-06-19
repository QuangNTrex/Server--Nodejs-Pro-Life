const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.postSignUp = (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  const fullName = req.body.fullName;

  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      User.create({ userName, email, fullName, password: hash }).then(() => {
        res.send({ result: { message: "success" } });
      });
    })
    .catch((err) => next(err));
};

module.exports.postSignIn = (req, res, next) => {
  // auto login
  if (req.session.user)
    return res.send({
      result: {
        isLogin: true,
        email: req.session.user.email,
        userName: req.session.user.userName,
        fullName: req.session.user.fullName,
      },
    });

  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then(async (response) => {
      let user = response;
      if (!user) user = await User.findOne({ userName: email });
      if (!user)
        return res
          .status(400)
          .send({ error: { message: "Username or email is incorrect" } });
      bcrypt.compare(password, user.password).then((result) => {
        if (!result)
          return res
            .status(400)
            .send({ error: { message: "Password is incorrect" } });
        req.session.user = user;
        req.session.isLogin = true;
        res.send({
          result: {
            message: "Login success",
            email: user.email,
            userName: user.userName,
            fullName: user.fullName,
          },
        });
      });
    })
    .catch((err) => next(err));
};

module.exports.postSignOut = (req, res, next) => {
  req.session.user = null;
  req.session.isLogin = null;
  req.session.save();
};
