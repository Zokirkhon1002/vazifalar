const express = require("express");
const app = express();
app.use(express.json());



// Home Page from Modul
const HomeRouter = require("./Routes/Home")
// only requests to /HomeRouter/* will be sent to our "router"
app.use("/",HomeRouter)



// categories
// post metodi
// id bo'yicha get metodi
// put metodi
// delete metodi
const CategoriesRouter = require("./Routes/Categories")
app.use("/", CategoriesRouter)




// portga oid
const port = process.env.PORT || 7000;
// $env:PORT=5001
// yoki
// yarn add dotenv
// keyin
// set port=5001

app.listen(port, () => {
  console.log(`${port}-portni eshitishni boshladim`);
});
