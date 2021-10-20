let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// environmental variables
const dotenv = require('dotenv');
  dotenv.config();

//Database setup
let mongoose = require('mongoose');
let db = require('./db');

//point mongoose to the db uri
mongoose.connect(db.URI);

let mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console,'Connection Error: '))
mongodb.once('open', ()=>{
  console.log('Connected to MongoDB...')
});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let booksRouter = require('../routes/book');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public'))); 
app.use(express.static(path.join(__dirname, '../../node_modules')));

// setup express session
app.use(session({
  secret:"SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// passport User configuration

// Create a User model
let userModel = require('../models/user');
let user = userModel.user;

// serialize and de-serialize user info
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book-list', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: 'Error'});
});

module.exports = app;
