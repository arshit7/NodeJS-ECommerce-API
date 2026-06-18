const express = require("express");
const router = express.Router();

const Product = require("../models/product");

// Add Product
router.post("/add", async (req, res) => {
    try {
        const { name, price, description } = req.body;

        const product = new Product({
            name,
            price,
            description
        });

        await product.save();

        res.json({
            message: "Product Added Successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// Get All Products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;