const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(403).send({ message: "You are not authorized. Login" });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.send({ message: "Something went wrong" });
      } else {
        req.body.user_id = decoded.user_id;
        req.body.userName = decoded.userName;
        next();
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

module.exports = auth;
