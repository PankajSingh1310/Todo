const express = require("express");
const app = express();
const path = require("path");
const userRoute = require("./routes/authRoute");
const connectDB = require("./config/db");

connectDB().then(() => {
    console.log("database connected successfully");
})

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("Home page");
});

app.use("/api/user", userRoute);

const port = 3000
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
});