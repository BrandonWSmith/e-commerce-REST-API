//Config Imports
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

//Utility Imports
const flash = require('express-flash');
const methodOverride = require('method-override');

//Security Imports
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { doubleCsrf } = require('csrf-csrf');
const doubleCsrfUtilities = require('./config/csrf');
const { doubleCsrfProtection } = doubleCsrf(doubleCsrfUtilities);

//Router Imports
const subdirectoriesRouter = require('./controllers/subdirectories');
const usersRouter = require('./controllers/users');
const productsRouter = require('./controllers/products');
const cartsRouter = require('./controllers/carts');
const cartsProductsRouter = require('./controllers/carts_products');
const ordersRouter = require('./controllers/orders');
const ordersProductsRouter = require('./controllers/orders_products');

//Config
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//Utility
app.use(flash());
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body){
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

//Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      //Set secure to true for production
      secure: false,
      sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: false
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Security
app.use(
  cors({
    origin: `http://loclhost:${port}`,
    credentials: true
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(doubleCsrfProtection);

//Routers
app.use('/', subdirectoriesRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/', cartsRouter);
app.use('/', cartsProductsRouter);
app.use('/', ordersRouter);
app.use('/', ordersProductsRouter);

//Server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});