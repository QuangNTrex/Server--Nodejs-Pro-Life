const checkMap = new Map([
  ["bill", true],
  ["task", true],
  ["lend", true],
  ["plan", true],
]);
const Bill = require("../models/bill");
const Lend = require("../models/lend");
const Plan = require("../models/plan");
const Task = require("../models/task");
const ShareData = require("../models/share-data");

const DATABASE = {
  bill: Bill,
  lend: Lend,
  plan: Plan,
  task: Task,
};

module.exports.postUpdateList = (req, res, next) => {
  const data = req.body.data;
  const type = req.body.type.toLowerCase();
  if (!checkMap.has(type))
    return res.status(400).send({ error: { message: "not have type" } });

  DATABASE[type]
    .findOne({ createdAt: data.createdAt, userId: req.session.user._id })
    .then((itemP) => {
      if (!itemP)
        return res.status(400).send({ error: { message: "not have itemP" } });
      DATABASE[type].findByIdAndUpdate(itemP._id).then((itemP) => {
        Object.keys(data).forEach((key) => (itemP[key] = data[key]));
        itemP.save().then(() => {
          res.send({ result: { message: "update success" } });
        });
      });
    })
    .catch((err) => next(err));
};

module.exports.postUpdateLists = (req, res, next) => {
  let error = null;
  const data = req.body.data || [];
  const type = req.body.type.toLowerCase();
  // return res.send({ data, type });
  if (!checkMap.has(type))
    return res.status(400).send({ error: { message: "not have type" } });

  data.forEach(async (itemPC) => {
    try {
      let itemPS = await DATABASE[type].findOne({
        createdAt: itemPC.createdAt,
        userId: req.session.user._id,
      });

      if (!itemPS) {
        await DATABASE[type].create({
          ...itemPC,
          userId: req.session.user._id,
        });
      } else {
        let updateItemPS = await DATABASE[type].findByIdAndUpdate(itemPS._id);

        Object.keys(itemPC).forEach((key) => (updateItemPS[key] = itemPC[key]));
        await updateItemPS.save();
      }
    } catch (err) {
      error = err;
      return next(err);
    }
  });
  console.log("finish update)");
  if (!error) res.send({ result: { message: "Updated" } });
};

module.exports.postDeleteList = (req, res, next) => {
  const type = req.body.type.toLowerCase();
  const createdAt = Number(req.body.createdAt);
  if (!checkMap.has(type))
    return res.status(400).send({ error: { message: "not have type" } });

  DATABASE[type]
    .findOne({ createdAt, userId: req.session.user._id })
    .then((itemPS) => {
      if (!itemPS)
        return res.status(400).send({ error: { message: "not have itemP" } });
      DATABASE[type].findByIdAndDelete(itemPS._id).then(() => {
        res.send({ result: { message: "Delete success" } });
      });
    })
    .catch((err) => next(err));
};

module.exports.getLists = (req, res, next) => {
  const type = req.body.type.toLowerCase();
  if (!checkMap.has(type))
    return res.status(400).send({ error: { message: "not have type" } });
  DATABASE[type]
    .find({ userId: req.session.user._id })
    .then((list) => {
      res.send({ list: { list } });
    })
    .catch((err) => next(err));
};

module.exports.postSyncList = (req, res, next) => {};

module.exports.postAddShareList = (req, res, next) => {
  const type = req.body.type.toLowerCase();
  const createdAt = req.body.createdAt;
  if (!checkMap.has(type))
    return res.status(400).send({ error: { message: "not have type" } });
  DATABASE[type]
    .findOne({ userId: req.session.user._id, createdAt })
    .then((itemPS) => {
      if (!itemPS) return res.send({ error: { message: "Not has item" } });
      ShareData.create({ data: itemPS, type }).then((data) => {
        return res.send({ result: { _id: data._id.toString(), type } });
      });
    })
    .catch((err) => next(err));
};

module.exports.getShareList = (req, res, next) => {
  const _id = req.params._id;

  ShareData.findById(_id).then((data) => {
    if (!data)
      return res.status(400).send({ error: { message: "not have data" } });
    res.send({ result: { data } });
  });
};
