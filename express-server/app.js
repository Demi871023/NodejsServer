var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

class PlayerAdapter{
  static middleware(req, res, next) {
    res.send('Player!!!');
  }
}

class RankingAdapter{
  static middleware(req, res, next) {
    res.send('Ranking!!!');
  }

  static displayRanking(req, res, next){
    // 1. 從資料庫抓各大排行榜
    //connecting_string = ('localhost:3306', 'root', '', )
    // 2. Ranking Algorithm
    
    // 3. Send Request to app
  }
}

class UserAdapter{
  static middleware(req, res, next) {
    res.send('User!!!');
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routers
app.all('/', indexRouter);
app.all('/users', usersRouter);
app.get('/play', PlayerAdapter.middleware);
app.get('/user', UserAdapter.middleware);
app.get('/ranking', RankingAdapter.middleware);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.all(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;


