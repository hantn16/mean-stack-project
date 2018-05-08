var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('./db/mongoose');

var appRoutes = require('./routes/app.routes');
var userRoutes = require('./routes/user.routes');
var sellerRoutes = require('./routes/seller.routes');
var customerRoutes = require('./routes/customer.routes');
var contractRoutes = require('./routes/contract.routes');
var apartmentRoutes = require('./routes/apartment.routes');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
// const connection = process.env.MONGO_URL || 'mongodb://localhost:27017/SaleReportApp';
// mongoose.Promise = global.Promise;
// mongoose.connect(connection,(e) =>{
//     if (e) {
//         console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
//         throw e;
//       }
// });
app.use('/users', userRoutes);
app.use('/sellers', sellerRoutes);
app.use('/customer', customerRoutes);
app.use('/contract', contractRoutes);
app.use('/apartment', apartmentRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
