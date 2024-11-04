const express = require("express");
const { getOrders, updateOrderStatus } = require("../handlers/order-handler");
const router = express.Router();

router.get("", async (req, res) => {
    try {
        const orders = await getOrders();
        return res.status(200).json({
            message: "Fetched all orders successfully",
            orders: orders
        })
    } catch (err) {
        console.error("Error fetching orders", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.post("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const orders = await updateOrderStatus(id, status);
        return res.status(200).json({
            message: "Updated Order successfully",
            orders: orders
        })
    } catch (err) {
        console.error("Error updating order", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;