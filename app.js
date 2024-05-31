const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const methodOverride = require('method-override');
const subdirectoriesRouter = require('./controllers/subdirectories');
const usersRouter = require('./controllers/users');
const productsRouter = require('./controllers/products');
const cartsRouter = require('./controllers/carts');
const cartsProductsRouter = require('./controllers/carts_products');
const ordersRouter = require('./controllers/orders');
const ordersProductsRouter = require('./controllers/orders_products');

//Utility
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body){
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//Session
app.use(
  session({
    secret: 'Password1',
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    saveUninitialized: false
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

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