const Bill = require("../models/bill");

module.exports.postAddBill = (req, res, next) => {
  const title = req.body.title;
  const totalPrice = req.body.totalPrice;
  const pay = req.body.pay;
  const list = req.body.list || [];

  Bill.create({
    title,
    totalPrice,
    pay,
    list,
    userId: req.session.user._id,
  }).then((bill) => {
    res.send({ result: { message: "Success" } });
  });
};

module.exports.postUpdateBill = (req, res, next) => {
  const newBill = req.body.bill;
  Bill.findOne({ createdAt: newBill.createdAt, userId: req.session.user._id })
    .then((bill) => {
      if (!bill)
        return res.status(400).send({ error: { message: "not have bill" } });
      Bill.findByIdAndUpdate(bill._id).then((bill) => {
        Object.keys(newBill).forEach((key) => (bill[key] = newBill[key]));
        bill.save().then(() => {
          res.send({ result: { message: "update success" } });
        });
      });
    })
    .catch((err) => next(err));
};

module.exports.postDeleteBill = (req, res, next) => {
  const createdAt = req.body.createdAt;
  Bill.findOne({ createdAt, userId: req.session.user._id }).then((bill) => {
    if (!bill)
      return res.status(400).send({ error: { message: "not have bill" } });
    Bill.findByIdAndDelete(bill._id).then((bill) => {
      res.send({ result: { message: "Delete success" } });
    });
  });
};

module.exports.postUpdateBills = (req, res, next) => {
  const bills = req.body.list || [];
  bills.forEach(async (bill) => {
    const oldBillServer = await Bill.findOne({
      createdAt: bill.createdAt,
      userId: req.session.user._id,
    });
    if (!oldBillServer)
      await Bill.create({ ...bill, userId: req.session.user._id });
    else {
      let updateBillServer = await Bill.findByIdAndUpdate(oldBillServer._id);
      Object.keys(bill).forEach((key) => (updateBillServer[key] = bill[key]));
      await updateBillServer.save();
    }
  });
  res.send({ result: { message: "Updated" } });
};

module.exports.getBills = (req, res, next) => {
  Bill.find({ userId: req.session.user._id }).then((bills) => {
    res.send({ result: { bills } });
  });
};
