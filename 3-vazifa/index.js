const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB ga ulanish hosil qilindi...");
    })
    .catch((e) => {
        console.error(`MongoDB ga ulanish vaqtida xato ro'y berdi... ${e}`);
    })


const SizeSchema = new mongoose.Schema({
    h: Number,
    w: Number,
    uom: String
})

const itemSchema = new mongoose.Schema({
    item: String,
    qty: Number,
    size: SizeSchema,
    status: String,
},{ collection: 'inventory' })

const Items = mongoose.model("Inventory", itemSchema)


async function getItems() {
    return await Items
    .find({status: "A"})
    .sort({item:1})
    .select({item:1, qty:1})
}

async function getItems2() {
    return await Items
    .find()
    .or([{qty: {$lte:50}}, {item: /.*l.*/i}])
    .sort({qty: -1})
    
}

async function ShowOnConsole(){
    const results = await getItems2()
    console.log(results)
}

ShowOnConsole();