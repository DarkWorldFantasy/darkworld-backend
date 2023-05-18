const cartModel = require("../model/cartModel");

const getCartById = async (req, res) => {
    try {
        const data = await cartModel
            .findOne({ user: req.user.id })
            .populate("product", "name");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const createCart = async (req, res) => {
    const cart = new cartModel(req.body);

    try {
        const data = await cart.save();
        res.send(data);
    } catch (err) {
        if (err.code === 11000) {
            res.status(404).send("You can choose only one entertainer.");
        } else {
            console.log(err);
        }
    }
};

const deleteCart = async (req, res) => {
    try {
        const cart = await cartModel.findByIdAndDelete(req.params.id);
        res.send(cart);
    } catch (error) {
        console.log(error);
    }
};

module.exports.getCartById = getCartById;
module.exports.createCart = createCart;
module.exports.deleteCart = deleteCart;
