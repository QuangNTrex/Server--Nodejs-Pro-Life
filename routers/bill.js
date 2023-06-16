const router = require("express").Router();
const BillController = require("../controllers/bill");

router.post("/create", BillController.postAddBill);
router.post("/update", BillController.postUpdateBill);
router.post("/updates", BillController.postUpdateBills);
router.get("/get", BillController.getBills);
router.post("/delete", BillController.postDeleteBill);

module.exports = router;
