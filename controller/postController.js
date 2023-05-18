const postModel = require("../model/postModel");
const formidable = require("formidable");
const fs = require("fs");

const getPost = async (req, res) => {
    try {
        const data = await postModel
            .find()
            .select({ photos: 0 })
            .populate("provider", "name");

        if (!data) return res.status(404).send("no post here!");

        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const createPost = async (req, res) => {
    const form = formidable.IncomingForm();
    form.keepExtentions = true;

    form.parse(req, (err, fields, files) => {
        if (err) return res.status(404).send("something went wrong!!!");

        const post = new postModel(fields);
        fs.readFile(files.photos.filepath, async (err, result) => {
            if (err) return res.status(404).send("something went wrong!!!");

            post.photos.data = result;
            post.photos.contentType = files.photos.mimetype;
            try {
                const data = await post.save();
                res.send(fields);
            } catch (error) {
                console.log(error);
            }
        });
    });
};

module.exports.createPost = createPost;
