const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: { type: Schema.Types.ObjectId, ref: "provider", required: true },
    desc: { type: String, minLength: 10, required: true },
    category: { type: Schema.Types.ObjectId, ref: "category", required: true },
    price: { type: Number, min: 500, required: true },
    availability: { type: Boolean, default: true },
    photos: { data: Buffer, contentType: String },
});

const productModel = model("product", productSchema);

module.exports = productModel;
