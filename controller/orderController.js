const orderModel = require("../model/orderModel");

const getOrder = async (req, res) => {
    try {
        const data = await orderModel
            .find()
            .populate("product", "name")
            .populate("user", "email");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getOrderById = async (req, res) => {
    try {
        const data = await orderModel
            .find({ user: req.user.id })
            .populate("product", "name")
            .populate("user", "email");
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
    order["done"] = req.body.done;
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
module.exports.createOrder = createOrder;
module.exports.updateOrder = updateOrder;
module.exports.deleteOrder = deleteOrder;
