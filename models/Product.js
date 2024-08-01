const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true, required: true },
        content: { type: String },
        price: { type: String },
        reducedPrice: { type: String },
        stock: { type: Number },
        sold: { type: Number },
        reviews: { type: Number },
        images: [ String ],
        category: [ String ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
