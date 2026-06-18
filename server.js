const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect(
"mongodb+srv://thaarshit1718_db_user:Arshit9333@arshit9333.jud1lqo.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Arshit9333"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error:", err));
app.get("/", (req, res) => {
    res.send("Ecommerce Running");
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));
app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});