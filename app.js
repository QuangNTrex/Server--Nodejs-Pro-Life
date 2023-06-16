const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
app.use(express.json());
const AuthRouter = require("./routers/auth");
const BillRouter = require("./routers/bill");

const MONGODB_URI = process.env.MONGODB_URI;

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "My Secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      // sameSite: "none",
      secure: false,
      // secure: true,
      maxAge: 1000 * 60 * 60,
      // httpOnly: true,
    },
  })
);

// app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use("/auth", AuthRouter);
app.use("/bill", BillRouter);

app.use("/test", (req, res, next) => {
  res.send({ result: "oke" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(5000, () => {
    console.log("listen in 5000");
  });
});
