const router = require("express").Router();
const AuthController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth").isAuth;

router.post("/signin", AuthController.postSignIn);
router.post("/signup", isAuth, AuthController.postSignUp);
router.post("/signout", isAuth, AuthController.postSignOut);

module.exports = router;
