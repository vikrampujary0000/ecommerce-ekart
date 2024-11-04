const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    date: { type: Date, default: Date.now },
    items: [{ type: mongoose.Schema.Types.Mixed }],
    paymentType: { type: String, required: true },
    address: { type: mongoose.Schema.Types.Mixed, required: true },
    status: { type: String, required: true, default: "In Progress" },
});
const Order = mongoose.model('orders', orderSchema);
module.exports = Order;