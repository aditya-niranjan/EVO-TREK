const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product_id: String,
  size: String,
  color: String,
  quantity: Number
});

const cartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  items: [cartItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = { Cart };
