const dotenv = require("dotenv");
dotenv.config(); // Load env variables first

const express = require("express");
const logger = require("./helper/logger");
const requestLogger = require("./helper/requestLogger");
const morgan = require("morgan");
const apiAuth = require("./helper/apiAuthentication");
const mongoose = require("mongoose");
const cors = require("cors");

const {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
} = require("./config/config");

const usersRouter = require("./routes/userRouter");
const gorupRouter = require("./routes/groupRouter");
const expenseRouter = require("./routes/expenseRouter");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// const connectionString = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/casplit?authSource=admin`
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@xnap.e3ov2nj.mongodb.net/?appName=xnap`;

// const connectionString = `mongodb+srv://rautkapil124_db_user:aaKOcJuK9CGFUbfV@xnap.e3ov2nj.mongodb.net/?appName=xnap`;

mongoose
  .connect(
    connectionString
    //     {
    //     maxPoolSize: 50,
    //     wtimeoutMS: 2500,
    //     useNewUrlParser: true
    // }
  )
  .then(() => {
    logger.info(`DB Connection Established`);
    console.log("DB Connected");
  })
  .catch((err) => {
    logger.error(`DB Connection Fail | ${err.stack}`);
    console.log(err);
  });

app.use("/api/users", usersRouter);
app.use("/api/group", apiAuth.validateToken, gorupRouter);
app.use("/api/expense", apiAuth.validateToken, expenseRouter);

// if (
//   process.env.NODE_ENV === "production" ||
//   process.env.NODE_ENV === "staging"
// ) {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

//To detect and log invalid api hits
app.all("*", (req, res) => {
  logger.error(`[Invalid Route] ${req.originalUrl}`);
  res.status(404).json({
    status: "fail",
    message: "Invalid path",
  });
});

const port = process.env.PORT || 8000;
app.listen(port, (err) => {
  console.log(`Server started in PORT | ${port}`);
  logger.info(`Server started in PORT | ${port}`);
});
