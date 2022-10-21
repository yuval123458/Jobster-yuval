const jwt = require("jsonwebtoken");
require("dotenv").config();

const CheckAuth = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send("you are not authorized!");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.test && req.method !== "GET") {
      console.log(req.method);
      return res.status(401).send({ msg: "Test user, READ ONLY" });
    }

    req.userId = decoded.userId;
  } catch (error) {
    return res.status(401).send("invalid token!");
  }

  console.log("passed AUTH....");
  return next();
};

module.exports = CheckAuth;
