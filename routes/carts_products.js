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
      res.status(200);
      next();
    });
  }
  catch (err) {
    next();
  }
}

const addToCart = async (req, res) => {
  const cart_id = parseInt(req.params.cart_id);
  const product_id = parseInt(req.query.product_id);
  const getProductName = await db.query('SELECT name FROM products WHERE id = $1', [product_id]);
  const product_name = Object.values(getProductName.rows[0]).toString();
  const quantity = parseInt(req.body.quantity);
  const getPrice = await db.query('SELECT price FROM products WHERE id = $1', [product_id]);
  const price = Object.values(getPrice.rows[0]).toString().slice(1);
  const added = new Date();

  const checkExists = await db.query('SELECT * FROM carts_products WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id]);

  if (checkExists.rows.length != 0) {
    res.status(400).send(`Product ID: ${product_id} already in cart ID: ${cart_id}`);
  }
  else {
    db.query('INSERT INTO carts_products (quantity, price, cart_id, product_id, added) VALUES ($1, $2, $3, $4, $5) RETURNING *', [quantity, price, cart_id, product_id, added], (err, results) => {
      if (err) {
        throw err;
      }
      console.log(`${product_name} x ${quantity} added to cart ID: ${cart_id}`);
      res.status(201);
    });
  }
}

const updateInCart = async (req, res) => {
  const cart_id = parseInt(req.params.cart_id);
  const product_id = parseInt(req.query.product_id);
  const quantity = parseInt(req.query.quantity);
  const getPrice = await db.query('SELECT price FROM products WHERE id = $1', [product_id]);
  const price = Object.values(getPrice.rows[0]).toString().slice(1);
  const modified = new Date();

  db.query('UPDATE carts_products SET quantity = $1, price = $2, cart_id = $3, product_id = $4, modified = $5', [quantity, price, cart_id, product_id, modified], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product ID: ${product_id} updated in cart ID: ${cart_id}`);
  });
}

const deleteInCart = (req, res, next) => {
  const cart_id = parseInt(req.params.cart_id);
  const product_id = parseInt(req.query.product_id);

  db.query('DELETE FROM carts_products WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id], (err, results) => {
    if (err) {
      throw err;
    }
    //res.status(200).send(`Product ID ${product_id} deleted from cart ID: ${cart_id}`);
    req.flash('carts_products-deleted', `Product ID: ${product_id} deleted in cart ID: ${cart_id}`);
    next();
  });
}

const deleteAllInCart = (req, res, next) => {
  const cart_id = parseInt(req.params.cart_id);

  db.query('DELETE FROM carts_products WHERE cart_id = $1', [cart_id], (err, results) => {
    if (err) {
      throw err;
    }
    //res.status(200).send(`Product ID ${product_id} deleted from cart ID: ${cart_id}`);
    req.flash('carts_products-deleted', `All products deleted in cart ID: ${cart_id}`);
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