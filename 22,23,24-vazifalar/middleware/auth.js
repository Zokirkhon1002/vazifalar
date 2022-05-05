const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("x-authToken");
  if (!token) {
    return res
      .status(401)
      .send("Token bo'lmaganligi sababli murojaat rad etildi!");
  } else {
    try {
      let key = "BuMeningMaxfiyKalitSozim";
      let decoded = jwt.verify(token, key);
      req.user = decoded;
      next();
    } catch (er) {
      return res.status(400).send(`yaroqsiz Tokken: ${er}`);
    }
  }
};
