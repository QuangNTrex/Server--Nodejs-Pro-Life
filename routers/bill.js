const router = require("express").Router();
const BillController = require("../controllers/bill");
const isAuth = require("../middleware/is-auth").isAuth;

router.post("/create", isAuth, BillController.postAddBill);
router.post("/update", isAuth, BillController.postUpdateBill);
router.post("/updates", isAuth, BillController.postUpdateBills);
router.get("/get", isAuth, BillController.getBills);
router.post("/delete", isAuth, BillController.postDeleteBill);

module.exports = router;
