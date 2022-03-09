const express = require("express");
const categoriesRoute = require("./routes/categories");
const customersRoute = require("./routes/customers");
const coursesRoute = require("./routes/courses");
const entrollmentsRoute = require("./routes/enrollments");
const routerUser = require("./routes/users");
const authRoute = require("./routes/auth");
const app = express();
const mongoose = require("mongoose");
const config = require("config");

// if(!config.get("jwtPrivateKey")){
//   console.log("Jiddiy xato! muhit o'zgaruvchisi bilan")
//   process.exit(1)
//   /**
//    * in Windows
//    * set virtualdars_jwtPrivateKey(muhit o'zgaruvchisi nomi)=buMeningMahfiyKalitim
//     */
// }

mongoose
  .connect("mongodb://localhost/virtualdars", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDBga ulanish hosil qilindi...");
  })
  .catch((err) => {
    console.error("MongoDBga ulanish vaqtida xato ro'y berdi...", err);
  });
mongoose.set("useFindAndModify", false);
app.use(express.json());

app.use("/api/categories", categoriesRoute);
app.use("/api/customers", customersRoute);
app.use("/api/courses", coursesRoute);
app.use("/api/enrollments", entrollmentsRoute);
app.use("/api/users", routerUser);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  res.status(500).send("Serverda kutilmagan xato ro'y berdi");
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port}chi portni eshitishni boshladim...`);
});
