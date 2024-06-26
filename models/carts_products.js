const db = require('../db/index');

const getCartsProducts = (req, res) => {
  db.query('SELECT * FROM carts_products ORDER BY cart_id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results.rows);
  });
}

const getCartsProductsByCartId = (req, res, next) => {
  try {
    const cart_id = parseInt(req.params.cart_id) || parseInt(req.cart[0].id);

    db.query('SELECT * FROM carts_products JOIN products ON carts_products.product_id = products.id WHERE cart_id = $1', [cart_id], (err, results) => {
      if (err) {
        throw err;
      }
      req.cart_products = results.rows;
      if (req.cart_products.length > 0) {
        req.cart.total = '$' +
          req.cart_products.reduce((acc, {total}) =>
            acc + parseFloat(total.replace(/[^0-9.-]+/g,"")),
            0
          )
          .toFixed(2)
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      }
      res.status(200);
      next();
    });
  }
  catch (err) {
    next();
  }
}

const addToCart = async (req, res, next) => {
  if (req.body.quantity) {
    const cart_id = parseInt(req.params.cart_id);
    const product_id = parseInt(req.query.product_id);
    const getProductName = await db.query('SELECT name FROM products WHERE id = $1', [product_id]);
    const product_name = Object.values(getProductName.rows[0]).toString();
    const getCurrentQuantity = await db.query('SELECT quantity FROM carts_products WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id]);
    const quantity = parseInt(req.body.quantity);
    const getPrice = await db.query('SELECT price FROM products WHERE id = $1', [product_id]);
    const price = Object.values(getPrice.rows[0]).toString().slice(1);
    const added = new Date();

    if (getCurrentQuantity.rows.length > 0) {
      const currentQuantity = parseInt(Object.values(getCurrentQuantity.rows[0]));

      updateInCart(req, res, next);
      
      req.flash('updated_in_cart', `${product_name} quantity updated to ${currentQuantity + quantity} in cart ID: ${cart_id}`);
    }
    else {
      db.query('INSERT INTO carts_products (quantity, price, cart_id, product_id, added) VALUES ($1, $2, $3, $4, $5) RETURNING *', [quantity, price, cart_id, product_id, added], (err, results) => {
        if (err) {
          throw err;
        }
        res.status(201);
      });
      console.log(`${product_name} x ${quantity} added to cart ID: ${cart_id}`);
      req.flash('added_to_cart', `${product_name} x ${quantity} added to cart ID: ${cart_id}`);
    }
  }
  next();
}

const updateInCart = async (req, res, next) => {
  const cart_id = parseInt(req.params.cart_id);
  const product_id = parseInt(req.query.product_id);
  const getProductName = await db.query('SELECT name FROM products WHERE id = $1', [product_id]);
  const product_name = Object.values(getProductName.rows[0]).toString();
  const getCurrentQuantity = await db.query('SELECT quantity FROM carts_products WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id]);
  const currentQuantity = parseInt(Object.values(getCurrentQuantity.rows[0]));
  const quantity = currentQuantity + parseInt(req.body.quantity);
  const getPrice = await db.query('SELECT price FROM products WHERE id = $1', [product_id]);
  const price = Object.values(getPrice.rows[0]).toString().slice(1);
  const modified = new Date();

  db.query('UPDATE carts_products SET quantity = $1, price = $2, cart_id = $3, modified = $4 WHERE product_id = $5', [quantity, price, cart_id, modified, product_id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200);
  });
  console.log(`${product_name} quantity updated to ${quantity} in cart ID: ${cart_id}`);
  req.flash('updated_in_cart', `${product_name} quantity updated to ${quantity} in cart ID: ${cart_id}`);
  next();
}

const deleteInCart = async (req, res, next) => {
  const cart_id = parseInt(req.params.cart_id);
  const product_id = parseInt(req.query.product_id);
  const getProductName = await db.query('SELECT name FROM products WHERE id = $1', [product_id]);
  const product_name = Object.values(getProductName.rows[0]).toString();

  db.query('DELETE FROM carts_products WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id], (err, results) => {
    if (err) {
      throw err;
    }
    console.log(`${product_name} deleted in cart ID: ${cart_id}`);
    res.status(200);
    next();
  });
}

const deleteAllInCart = (req, res, next) => {
  const cart_id = parseInt(req.params.cart_id);

  db.query('DELETE FROM carts_products WHERE cart_id = $1', [cart_id], (err, results) => {
    if (err) {
      throw err;
    }
    console.log(`All products deleted in cart ID: ${cart_id}`);
    req.flash('carts_products_deleted', `All products deleted in cart ID: ${cart_id}`);
    next();
  });
}

module.exports = {
  getCartsProducts,
  getCartsProductsByCartId,
  addToCart,
  updateInCart,
  deleteInCart,
  deleteAllInCart
}