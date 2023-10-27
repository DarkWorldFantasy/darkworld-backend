const orderModel = require("../model/orderModel");

const getOrder = async (req, res) => {
    try {
        const data = await orderModel
            .find()
            .sort({_id: -1})
            .populate("product", "name")
            .populate("user", "email");
        if (!data) return res.status(404).send("no data found!");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getOrderById = async (req, res) => {
    try {
        const data = await orderModel
            .find({ user: req.user.id })
            .sort({_id: -1})
            .populate("product", "name")
            .populate("user", "email");
        if (!data) return res.status(404).send("no data found!");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const recentOrder = async (req, res) => {
    try {
        const data = await orderModel
            .find({ user: req.user.id })
            .sort({ _id: -1 })
            .limit(3)
            .populate("product", "name")
            .populate("user", "email");
if (!data) return res.status(404).send("no data found!");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const latestOrderByUser = async (req, res) => {
    try {
        const data = await orderModel
            .findOne({ user: req.user.id, product: req.params.productId })
            .sort({ _id: -1 })
            .populate("product", "name")
            .populate("user", "email");
if (!data) return res.status(404).send("no data found!");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const createOrder = async (req, res) => {
    const order = new orderModel(req.body);

    try {
        const data = await order.save();
        res.send(data);
    } catch (err) {
        console.log(err);
    }
};

const updateOrder = async (req, res) => {
    const order = await orderModel.findById(req.params.id);
    for (let i in req.body) {
        order[i] = req.body[i];
    }
    try {
        const data = await order.save();
        res.send(data);
    } catch (err) {
        console.log(err);
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await orderModel.findByIdAndDelete(req.params.id);
        res.send(order);
    } catch (error) {
        console.log(error);
    }
};

module.exports.getOrder = getOrder;
module.exports.getOrderById = getOrderById;
module.exports.latestOrderByUser = latestOrderByUser;
module.exports.recentOrder = recentOrder;
module.exports.createOrder = createOrder;
module.exports.updateOrder = updateOrder;
module.exports.deleteOrder = deleteOrder;
