const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const usersRoute = require("./routes/usersRoute");
const jobsRoute = require("./routes/jobsRoute");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("mongoose connected..");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, x-access-token, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
  );
  next();
});

app.use("/api/users", usersRoute);
app.use("/api/jobs", jobsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
