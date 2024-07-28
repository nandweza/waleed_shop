const express = require("express");
const homeRoutes = require("./routes/homeRoutes");
const productRoutes = require("./routes/productRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();

// register view engine
app.set("view engine", "ejs");
app.set("views", "views");

//middleware and static files
app.use(express.static('public'));
app.use(express.static('public/uploads'));
app.use(express.static('public/css/style.css'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// db connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected Successfully!"))
  .catch((err) => console.log(err));

app.use("/", homeRoutes);
app.use("/products", productRoutes);
app.use("/contact-us", contactRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
