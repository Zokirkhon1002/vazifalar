const { User, validate } = require("../models/user");
const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");

userRouter.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

userRouter.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Mavjud bo'lgan foydalanuvchi");

  //   1-yo'li
  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password
  // });

  // 2-yo'li
  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));

  // parolni hashlash
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  // 1-yo'li
  // res.send(user);

  // 2-yo'li
  // const  {name, email} = user
  // res.send({
  //     name: name,
  //     email: email
  // });

  // 3-yo'li
  res.send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
});

module.exports = userRouter;
