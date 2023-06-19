const router = require("express").Router();
const AuthController = require("../controllers/auth");

router.post("/signin", AuthController.postSignIn);
router.post("/signup", AuthController.postSignUp);
router.post("/signout", AuthController.postSignOut);

module.exports = router;
