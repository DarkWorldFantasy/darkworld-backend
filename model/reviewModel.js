const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
    entertainerId: {
        type: Schema.Types.ObjectId,
        ref: "entertainer",
        required: true,
    },
    review: { type: Number, default: 0 },
    orderCount: { type: Number, default: 1 },
});

const reviewModel = model("review", reviewSchema);

module.exports = reviewModel;
