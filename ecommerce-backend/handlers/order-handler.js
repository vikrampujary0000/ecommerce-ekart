const Order = require("../db/order");

async function addOrder(userId, orderData) {
    let order = new Order({
        ...orderData,
        userId: userId,
        status: "In Progress"
    });
    await order.save();
}

async function getCustomerOrders(userId) {
    let orders = await Order.find({ userId: userId });
    return orders.map((x) => x.toObject());
}

async function getOrders() {
    let orders = await Order.find();
    return orders.map((x) => x.toObject());
}

async function updateOrderStatus(id, status) {
    await Order.findByIdAndUpdate(id, {
        status: status
    })
}

module.exports = { addOrder, getCustomerOrders, getOrders, updateOrderStatus }