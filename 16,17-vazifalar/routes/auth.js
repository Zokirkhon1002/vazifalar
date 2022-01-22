const { User } = require("../models/user");
const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken")
const config  = require("config")

userRouter.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Email yoki parol noto'g'ri");

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    return res.status(400).send("Email yoki parol noto'g'ri");
  }

  const token = jwt.sign({_id:user._id}, 'BuMeningMaxfiyKalitSozim');

  res.header('x-authToken',token).send(true)
  //   user = new User(_.pick(req.body, ["name", "email", "password"]));

  //   // parolni hashlash
  //   const salt = await bcrypt.genSalt();
  //   user.password = await bcrypt.hash(user.password, salt);

  //   await user.save();
  //   res.send(_.pick(user, ["_id", "name", "email"]));
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = userRouter;
