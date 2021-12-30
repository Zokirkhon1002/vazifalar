const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/practiceSeven2")
  .then(() => console.log("MongoDB ga ulanish hosil qilindi"))
  .catch((err) =>
    console.error("MongoDB ga ulanish vaqtida xatolik ro'y berdi...,", err)
  );

const authorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  address: String,
  email: String,
  phone: String,
  status: String,
  hobby: String,
});

const bookSchema = new mongoose.Schema({
  authors: {
    type: [authorSchema],
    required: true,
  },
  title: String,
  channelUrl: String,
  date: String,
});

const Author = mongoose.model("Author", authorSchema);
const Book = mongoose.model("Book", bookSchema);


async function createBook(authors, title, channelUrl, data) {
  const book1 = new Book({ authors:authors, title, channelUrl, data });

  const result = await book1.save();
  console.log(result);
}

let url =
  "https://youtube.com/playlist?list=PL6_0LObBt5Zn9cDv3gCBWRtb4E1CMgBvL";
let title = "Masalalar toplami";
let sana = "2021:11:03";
createBook(
  [
    new Author({
        firstName: "Zokirkhon",
        lastName: "Kotibkhonov",
        age: 23,
        address: "Namangan",
        email: "zokirxonkotibxanov@gmail.com",
        phone: "01080891816",
        status: "Student",
        hobby: "Table tennis",
      }),
      new Author({
        firstName: "Boburmirzo",
        lastName: "Rosulov",
        age: 24,
        address: "Namangan",
        email: "boburmirzorosulov@gmail.com",
        phone: "998913430668",
        status: "Teacher",
        hobby: "Table tennis",
      })
  ],
  title,
  url,
  sana
);







// 61cd5e3dc299bc810ec72b1d

// async function updateAuthor(bookId) {
//   const updated = await Book.updateOne(
//     { _id: bookId },
//     // {
//     //   $set: {
//     //     "author.firstName": "Zokirkhon updated",
//     //   },
//     // }


//     // delete 
//     {
//         $unset: {
//           "author": "",
//         },
//       }
//   );
//   console.log(updated)
// }
// updateAuthor("61cd5e3dc299bc810ec72b1d")