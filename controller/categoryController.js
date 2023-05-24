const categoryModel = require("../model/categoryModel");

const getCategory = async (req, res) => {
    try {
        const data = await categoryModel.find();
        if (!data) return res.status(404).send("no category found!");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const createCategory = async (req, res) => {
    const category = new categoryModel(req.body);

    try {
        const data = await category.save();
        res.send(data);
    } catch (error) {
        res.status(404).send("Category should be in at least 3 characters!");
    }
};

const deleteCategory = async (req, res) => {
    try {
        const data = await categoryModel.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

module.exports.getCategory = getCategory;
module.exports.createCategory = createCategory;
module.exports.deleteCategory = deleteCategory;
