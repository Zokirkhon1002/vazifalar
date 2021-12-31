// run-rs --mongod --keep

const mongoose = require("mongoose");
const User = require("./models/user");

const connString = "mongodb://localhost/practiceEight";
async function initDatabase() {
  // bazaga ulanamiz
  await mongoose
    .connect(connString, {
      replicaSet: 'rs',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB ga ulanish hosil qilindi"))
    .catch((err) =>
      console.error("MongoDB ga ulanish vaqtida xatolik ro'y berdi...,", err)
    );

  const senderAccountNumber = "SA1002001";
  const receiverAccountNumber = "SA3104215";

  // jo'natuvchini hisob raqami bo'yicha bazadan izlab ko'ramiz
  let sender = await User.findOne({ accountNumber: senderAccountNumber });

  // agar topilmasa, unda bazaga yangi hujjat qo'shamiz
  if (!sender) {
    sender = new User({
      accountNumber: senderAccountNumber,
      name: "Ahmad",
      balance: 50000.0,
    });
    await sender.save();
  }

  // oluvchini bazadan hisob raqami bo'yicha izlab ko'ramiz
  let receiver = await User.findOne({ accountNumber: receiverAccountNumber });

  // agar topilmasa, bazaga yangi hujjat qo'shamiz
  if (!receiver) {
    receiver = new User({
      accountNumber: receiverAccountNumber,
      name: "Anvar",
      balance: 1200.0,
    });
    await receiver.save();
  }
}

// initDatabase funktsiyasini modulimizda eksport qilamiz
module.exports = initDatabase;
