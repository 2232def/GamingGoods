const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');

const db = require("./config/mongoose-connection");

const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require("./routes/productsRouter");
const imageRouter = require("./routes/imageRouter");

require("dotenv").config()

const app = express();
const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(expressSession({
  resave: true,
  saveUninitialized: false,
  secret: process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/product_route', productsRouter);
app.use('/images_upload', imageRouter);



app.listen(8080)
