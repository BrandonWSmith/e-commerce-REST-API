const db = require('../db/index');

const getOrderProducts = (req, res) => {
  db.query('SELECT * FROM orders_products ORDER BY order_id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results.rows);
  });
}

const getOrdersProductsByOrderId = (req, res) => {
  const order_id = parseInt(req.params.id);

  db.query('SELECT * FROM orders_products WHERE order_id = $1', [order_id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results.rows);
  });
}

const addToOrder = async (req, res, next) => {
  const getOrderId = await db.query('SELECT id FROM orders ORDER BY id DESC');
  const order_id = parseInt(req.params.order_id) || parseInt(getOrderId.rows[0].id);
  const user_id = parseInt(req.params.id);
  const added = new Date();

  const cart_id = parseInt(req.params.cart_id);

  const getProducts = await db.query('SELECT product_id FROM carts_products WHERE cart_id = $1', [cart_id]);
  const products = []
  for(const product in getProducts.rows) {
    const product_id = parseInt(getProducts.rows[product].product_id);

    products.push(product_id);
  }

  products.forEach(async product_id => {
    const getQuantity = await db.query('SELECT quantity FROM carts_products WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id]);
    const quantity = parseInt(getQuantity.rows[0].quantity);

    const getPrice = await db.query('SELECT price FROM products WHERE id = $1', [product_id]);
    const price = Object.values(getPrice.rows[0]).toString().slice(1);

    db.query('INSERT INTO orders_products (quantity, price, order_id, product_id, added) VALUES ($1, $2, $3, $4, $5) RETURNING *', [quantity, price, order_id, product_id, added], (err, results) => {
      if (err) {
        throw err;
      }
    });
  });
  req.flash('orders_products_added', `All products from cart ID: ${cart_id} added to order ID: ${order_id}`);
  next();
}

const updateInOrder = async (req, res) => {
  const order_id = parseInt(req.params.id);
  const product_id = parseInt(req.query.product_id);
  const quantity = parseInt(req.query.quantity);
  const getPrice = await db.query('SELECT price FROM products WHERE id = $1', [product_id]);
  const price = Object.values(getPrice.rows[0]).toString().slice(1);
  const modified = new Date();

  db.query('UPDATE orders_products SET quantity = $1, price = $2, order_id = $3, product_id = $4, modified = $5', [quantity, price, order_id, product_id, modified], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product ID: ${product_id} updated in order ID: ${order_id}`);
  });
}

const deleteInOrder = (req, res) => {
  const order_id = parseInt(req.params.id);
  const product_id = parseInt(req.query.product_id);

  db.query('DELETE FROM orders_products WHERE order_id = $1 AND product_id = $2', [order_id, product_id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product ID ${product_id} deleted from cart ID: ${order_id}`);
  });
}

module.exports = {
  getOrderProducts,
  getOrdersProductsByOrderId,
  addToOrder,
  updateInOrder,
  deleteInOrder
}