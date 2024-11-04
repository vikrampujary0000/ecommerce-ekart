const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;
const dbURL = process.env.DB_URL

const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const { verifyToken, isAdmin } = require("./middleware/auth.middleware");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("server running");
});

app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);
app.use("/product", verifyToken, isAdmin, productRoutes)
app.use("/customer", verifyToken, customerRoutes);
app.use("/auth", authRoutes);
app.use("/orders", verifyToken, isAdmin, orderRoutes)

async function connectDB() {
    try {
        await mongoose.connect(dbURL, {
            dbName: "ecommerce-project"
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

connectDB();

app.listen(port, () => { console.log("Server running on Port:" + port) });