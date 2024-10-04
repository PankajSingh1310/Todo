require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const userRoute = require("./routes/authRoute");
const noteRoute = require("./routes/noteRoute");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

connectDB().then(() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => console.error('MongoDB connection error:', err));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.render("index");  
});

app.get("/login", (req, res) => {
    res.render("login");
})

app.use("/api/user", userRoute);
app.use("/api/note", noteRoute);

const port = 3000
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
});