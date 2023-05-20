const formidable = require("formidable");
const fs = require("fs");
const productModel = require("../model/productModel");

const getProduct = async (req, res) => {
    try {
        const data = await productModel
            .find()
            .select({ photos: 0 })
            .populate("name", "name")
            .populate("category", "name");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getProductById = async (req, res) => {
    try {
        const data = await productModel
            .findById(req.params.id)
            .select({ photos: 0 })
            .populate("name", "name")
            .populate("category", "name");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getPhotoById = async (req, res) => {
    try {
        const data = await productModel
            .findById({ _id: req.params.id })
            .select({ photos: 1 });

        res.set("Content-Type", data.photos.contentType);
        res.send(data.photos.data);
    } catch (error) {
        console.log(error);
    }
};

const createProduct = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) return res.status(404).send("something went wrong!!!");

        const product = new productModel(fields);
        fs.readFile(files.photos.filepath, async (error, result) => {
            if (error) return res.status(404).send("something went wrong!!!");
            product.photos.data = result;
            product.photos.contentType = files.photos.mimetype;
            const data = await product.save();

            res.send(fields);
        });
    });
};

const updateProduct = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    const product = await productModel.findById(req.params.id);

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(404).send("something went wrong!!!");

        for (let i in fields) {
            product[i] = fields[i];
        }

        if (files.photos) {
            if (files.photos.originalFilename) {
                fs.readFile(files.photos.filepath, (err, result) => {
                    product.photos.data = result;
                    product.photos.contentType = files.photos.mimetype;

                    try {
                        product.save();
                        res.send(fields);
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
        } else {
            try {
                product.save();
                res.send(fields);
            } catch (error) {
                console.log(error);
            }
        }
    });
};

const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        res.send(product);
    } catch (error) {
        console.log(error);
    }
};

module.exports.getProduct = getProduct;
module.exports.getProductById = getProductById;
module.exports.getPhotoById = getPhotoById;
module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
