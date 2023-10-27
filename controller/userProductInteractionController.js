const userProductInteractionModel = require("../model/userProductInteractionModel");

const getInteractionById = async (req, res) => {
    try {
        const data = await userProductInteractionModel.findOne({
            userId: req.user.id,
        });
        if (!data) return res.status(404).send("no data found!");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const createInteraction = async (req, res) => {
    let obj = await userProductInteractionModel.findOne({
        userId: req.body.userId,
    });

    if (obj) {
        const index = obj.productInteraction.findIndex(
            (item) => item.product == req.body.productInteraction[0].product
        );
        if (index >= 0) {
            obj.productInteraction[index].orderCount++;
        } else {
            obj.productInteraction.push(req.body.productInteraction[0]);
        }
        try {
            const data = await obj.save();
            res.send(data);
        } catch (error) {
            res.status(404).send("something went wrong!");
        }
    } else {
        obj = new userProductInteractionModel(req.body);
        try {
            const data = await obj.save();
            res.send(data);
        } catch (error) {
            res.status(404).send("something went wrong!");
        }
    }
};

module.exports.getInteractionById = getInteractionById;
module.exports.createInteraction = createInteraction;
