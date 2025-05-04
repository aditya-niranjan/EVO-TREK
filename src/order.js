  const mongoose = require('mongoose');
require('dotenv').config();

// We'll use the same connection as in mongodb.js



  const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    username: String,        // Logged-in account name
    fullName: String,        //  Form input
    address: String,
    email: String,
    phone: String,
    items: Array,
    total: Number,
    date: Date
});

const Order = mongoose.model('Order', orderSchema);
module.exports = { Order };

