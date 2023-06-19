require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const AuthRouter = require("./routers/auth");
const BillRouter = require("./routers/bill");
const DataRouter = require("./routers/data");

const ErrorDB = require("./models/error");

const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV;
console.log("NODE_ENV", NODE_ENV);

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(express.json());
app.use(
  session({
    secret: "My Secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      sameSite: NODE_ENV === "development" && "none",
      secure: NODE_ENV === "development",
      // secure: true,
      maxAge: 1000 * 60 * 60,
      httpOnly: NODE_ENV !== "development",
    },
  })
);

app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      NODE_ENV !== "development" && "http://localhost:3000",
      NODE_ENV === "development" && "https://lifeandpro.web.app",
    ],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    `${
      NODE_ENV !== "development"
        ? "http://localhost:3000"
        : "https://lifeandpro.web.app"
    }`
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/auth", AuthRouter);
app.use("/bill", BillRouter);
app.use("/data", DataRouter);

app.use("/test", (req, res, next) => {
  res.send({ result: "oke" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log("in error fn");
  ErrorDB.create({ error: err });
  return res.status(500).send({ error: { message: "Something broke!" } });
});

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(5000, () => {
    console.log("listen in 5000");
  });
});
