const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/practiceSeven")
  .then(() => console.log("MongoDB ga ulanish hosil qilindi"))
  .catch((err) =>
    console.error("MongoDB ga ulanish vaqtida xatolik ro'y berdi...,", err)
  );

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    address: String,
    email: String,
    phone: String,
    status: String,
    hobby: String,
  })
);

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    title: String,
    channelUrl: String,
    date: String,
  })
);

async function createAuthor(
  firstName,
  lastName,
  age,
  address,
  email,
  phone,
  status,
  hobby
) {
  const author = new Author({
    firstName,
    lastName,
    age,
    address,
    email,
    phone,
    status,
    hobby,
  });

  const result = await author.save();
  console.log(result);
}

async function createBook(authorId, title, channelUrl, data) {
  const book1 = new Book({
    author: authorId,
    title: title,
    channelUrl: channelUrl,
    data: data,
  });

  const result = await book1.save();
  console.log(result);
}

async function listBooks() {
  const book = await Book
  .find()
  .populate("author", 'firstName lastName -_id')
  // .populate("author", ['firstName', 'lastName', 'age']) // bunisida id ni olib tashlab bo'lmadi
  .select("title author");
  console.log(book);
}


// createAuthor("Zokirkhon","Kotibkhonov",23,"Namangan","zokirxonkotibxanov@gmail.com","01080891816","Student","Table tennis")

let url = "https://youtube.com/playlist?list=PL6_0LObBt5Zn9cDv3gCBWRtb4E1CMgBvL"
let id = "61cd4faefb4e74e50cf474dc";
let title = "Masalalar toplami";
let sana = "2021:11:03";
// createBook(id,title,url,sana)

listBooks()