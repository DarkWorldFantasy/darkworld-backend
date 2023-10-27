const reviewModel = require("../model/reviewModel");

const getReview = async (req, res) => {
    try {
        const data = await reviewModel.find();
        if (!data) return res.status(404).send("no data found!");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getReviewById = async (req, res) => {
    try {
        const data = await reviewModel.findOne({
            entertainerId: req.params.id,
        });
        if (!data) return res.status(404).send("no data found!");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const createReview = async (req, res) => {
    let obj = await reviewModel.findOne({
        entertainerId: req.body.entertainerId,
    });

    if (obj) {
        obj.orderCount = obj.orderCount + 1;
        try {
            const data = await obj.save();
            res.send(data);
        } catch (error) {
            res.status(404).send("something went wrong!");
        }
    } else {
        obj = new reviewModel(req.body);
        try {
            const data = await obj.save();
            res.send(data);
        } catch (error) {
            res.status(404).send("something went wrong!");
        }
    }
};

const updateReview = async (req, res) => {
    const obj = await reviewModel.findOne({
        entertainerId: req.params.id,
    });
    const prevCount = obj.orderCount > 1 ? obj.orderCount - 1 : obj.orderCount;
    const newReview =
        (obj.review * prevCount + parseInt(req.body.review)) / obj.orderCount;
    obj["review"] = newReview;
    try {
        const data = await obj.save();
        res.send(data);
    } catch (err) {
        console.log(err);
    }
};

const deleteReview = async (req, res) => {
    try {
        const data = await reviewModel.deleteOne({
            entertainerId: req.params.id,
        });
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

module.exports.getReview = getReview;
module.exports.getReviewById = getReviewById;
module.exports.createReview = createReview;
module.exports.updateReview = updateReview;
module.exports.deleteReview = deleteReview;
