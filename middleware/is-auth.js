module.exports.isAuth = (req, res, next) => {
  if (req.session.isLogin && !!req.session.user) return next();

  return res.status(400).send({ error: { message: "Not Auth" } });
};
