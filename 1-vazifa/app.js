const express = require("express");
const app = express();
app.use(express.json());
const Joi = require("joi");

const MasalalarToplami = [
  {
    id: 1,
    name: "Begin",
    link: "https://youtube.com/playlist?list=PL6_0LObBt5ZltsFsYCKPbCbG54W60Qg7N",
  },
  {
    id: 2,
    name: "Integer",
    link: "https://youtube.com/playlist?list=PL6_0LObBt5ZkZ6OyhfrbhwHKiDWzqpGfh",
  },
  {
    id: 3,
    name: "Boolean",
    link: "https://youtube.com/playlist?list=PL6_0LObBt5Zk6JMhLjxuL7yzUx14B-W_N",
  },
  {
    id: 4,
    name: "If else",
    link: "https://youtube.com/playlist?list=PL6_0LObBt5ZmL1mkRv97czibdcVQ8KRVJ",
  },
  { id: 5, name: "Switch Case" },
  { id: 6, name: "For Loop" },
  { id: 7, name: "While" },
  { id: 8, name: "Series" },
  { id: 9, name: "MinMax" },
  { id: 10, name: "Function Simple" },
  { id: 11, name: "Array" },
  { id: 12, name: "String" },
  { id: 13, name: "Matrix" },
  { id: 14, name: "File" },
  { id: 15, name: "Text" },
  { id: 16, name: "Param" },
  { id: 17, name: "Recur" },
  { id: 18, name: "Tanlangan Masalalar" },
];

// categories
app.get("/api/categories", (req, res) => {
  res.send(MasalalarToplami);
});

// post metodi
app.post("/api/categories", (req, res) => {
  const { err } = validateMasala(req.body);
  if (err) {
    return res.status(400).send(err.details[0].message);
  }

  const yangiMasalaTopmlari = {
      id: MasalalarToplami.length + 1,
      name: req.body.name,
      link: req.body.link,
  }
  MasalalarToplami.push(yangiMasalaTopmlari);
  res.status(201).send(yangiMasalaTopmlari);
});




// get metodi
app.get("/api/categories/:id",(req,res)=> {
    const masalaToplam = MasalalarToplami.find((c) => c.id === Number(req.params.id));
    if (!masalaToplam) return res.status(404).send("Berilgan IDga teng bo'lgan Masalalar to'plami topilmadi");

    res.send(masalaToplam)
});







// put metodi
app.put('/api/categories/:id',(req,res)=> {
    const masalaToplam = MasalalarToplami.find((c) => c.id === Number(req.params.id));
    if (!masalaToplam) return res.status(404).send("Berilgan IDga teng bo'lgan Masalalar to'plami topilmadi");

    const {err} = validateMasala(req.body)
    if(err) return res.status(400).send(err.details[0].message);

    masalaToplam.name = req.body.name;
    masalaToplam.link = req.body.link;
    res.send(masalaToplam)
})




// delete metodi
app.delete('/api/categories/:id', (req,res)=> {
    const masalaToplam = MasalalarToplami.find((c) => c.id === Number(req.params.id));
    if (!masalaToplam) return res.status(404).send("Berilgan IDga teng bo'lgan Masalalar to'plami topilmadi");

    const masalaToplamIndex = MasalalarToplami.indexOf(masalaToplam)
    MasalalarToplami.splice(masalaToplamIndex,1);
    res.send(masalaToplam)
})







// validatsiya
function validateMasala(book) {
  const bookSchema = Joi.object({
    name: Joi.string().required().min(3),
  });

  return Joi.validate(book, bookSchema);
}


// port oid
const port = process.env.PORT || 7000;
// $env:PORT=5001
// yoki
// yarn add dotenv
// keyin
// set port=5001

app.listen(port, () => {
  console.log(`${port}-portni eshitishni boshladim`);
});
