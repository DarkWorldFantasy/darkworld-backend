const wishlistModel = require("../model/wishlistModel");

const getWishlistById = async (req, res) => {
    try {
        const data = await wishlistModel.findOne({
            user: req.user.id,
            product: req.params.id,
        });
        if (!data) return res.status(404).send("no wishlist found!");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getWishlistByUserId = async (req, res) => {
    try {
        const data = await wishlistModel
            .find({ user: req.user.id })
            .populate("product", "name username boobs role");
        if (!data) return res.status(404).send("no wishlist found!");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const createWishlist = async (req, res) => {
    const wishlist = new wishlistModel({
        user: req.user.id,
        product: req.body.id,
    });

    try {
        const data = await wishlist.save();
        res.send(data);
    } catch (error) {
        res.status(404).send("Something weng wrong!");
    }
};

const deleteWishlist = async (req, res) => {
    try {
        const data = await wishlistModel.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

module.exports.getWishlistById = getWishlistById;
module.exports.getWishlistByUserId = getWishlistByUserId;
module.exports.createWishlist = createWishlist;
module.exports.deleteWishlist = deleteWishlist;
