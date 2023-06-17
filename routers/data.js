const router = require("express").Router();
const DataController = require("../controllers/data");
const isAuth = require("../middleware/is-auth").isAuth;

router.post("/update", isAuth, DataController.postUpdateList);
router.post("/updates", isAuth, DataController.postUpdateLists);
router.get("/get", isAuth, DataController.getLists);
router.post("/delete", isAuth, DataController.postDeleteList);

module.exports = router;
