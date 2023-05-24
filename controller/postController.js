const postModel = require("../model/postModel");
const formidable = require("formidable");
const fs = require("fs");

const getPost = async (req, res) => {
    try {
        const data = await postModel
            .find()
            .populate("name", "name")
            .populate("user", "email");

        if (!data) return res.status(404).send("no post here!");

        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getPostById = async (req, res) => {
    try {
        const data = await postModel
            .find({ _id: req.params.id, user: req.user.id })
            .populate("name", "name")
            .populate("user", "name");

        if (!data) return res.status(404).send("no post here!");

        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getPostByUserId = async (req, res) => {
    try {
        const data = await postModel
            .find({ user: req.user.id })
            .populate("user", "email")
            .populate("name", "name");

        if (!data) return res.status(404).send("no post here!");

        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const createPost = async (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });
    form.keepExtentions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(404).send("something went wrong!!!");

        const post = new postModel(fields);

        let readPostPhotos;
        if (files.photos) {
            if (files.photos.originalFilename) {
                readPostPhotos = new Promise((resolve, reject) => {
                    fs.readFile(files.photos.filepath, (err, result) => {
                        if (err)
                            reject(
                                res.status(404).send("something went wrong!!!")
                            );

                        resolve([
                            {
                                data: result,
                                contentType: files.photos.mimetype,
                            },
                        ]);
                    });
                });
            }

            if (files.photos.length > 0) {
                readPostPhotos = Promise.all(
                    files.photos.map((photo) => {
                        return new Promise((resolve, reject) => {
                            fs.readFile(photo.filepath, (err, result) => {
                                if (err)
                                    reject(
                                        res
                                            .status(404)
                                            .send("something went wrong!!!")
                                    );

                                resolve({
                                    data: result,
                                    contentType: photo.mimetype,
                                });
                            });
                        });
                    })
                );
            }

            await readPostPhotos.then((result) => {
                post.photos = result;
                try {
                    post.save();
                    res.send(fields);
                } catch (err) {
                    console.log(err);
                }
            });
        } else {
            try {
                post.save();
                res.send(fields);
            } catch (err) {
                console.log(err);
            }
        }
    });
};

const updatePost = async (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });
    form.keepExtentions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(404).send("something went wrong!!!");

        const post = await postModel.findById(req.params.id);

        for (let i in fields) {
            i == "comments"
                ? post[i].push({ user: req.user.id, data: fields[i] })
                : (post[i] = fields[i]);
        }

        let readPostPhotos;
        if (files.photos) {
            if (files.photos.originalFilename) {
                readPostPhotos = new Promise((resolve, reject) => {
                    fs.readFile(files.photos.filepath, (err, result) => {
                        if (err)
                            reject(
                                res.status(404).send("something went wrong!!!")
                            );

                        resolve([
                            {
                                data: result,
                                contentType: files.photos.mimetype,
                            },
                        ]);
                    });
                });
            }

            if (files.photos.length > 0) {
                readPostPhotos = Promise.all(
                    files.photos.map((photo) => {
                        return new Promise((resolve, reject) => {
                            fs.readFile(photo.filepath, (err, result) => {
                                if (err)
                                    reject(
                                        res
                                            .status(404)
                                            .send("something went wrong!!!")
                                    );

                                resolve({
                                    data: result,
                                    contentType: photo.mimetype,
                                });
                            });
                        });
                    })
                );
            }
        }

        if (readPostPhotos) {
            await readPostPhotos.then((result) => {
                post.photos = result;
                try {
                    post.save();
                    res.send(fields);
                } catch (err) {
                    console.log(err);
                }
            });
        } else {
            try {
                post.save();
                res.send(fields);
            } catch (err) {
                console.log(err);
            }
        }
    });
};

const deleteComment = async (req, res) => {
    const post = await postModel
        .findById(req.body.postId)
        .select({ photos: 0 });

    const newData = post.comments.filter(
        (comment) => comment._id != req.body.commentId
    );

    post.comments = newData;

    try {
        post.save();
        res.send(newData);
    } catch (err) {
        console.log(err);
    }
};

const deletePost = async (req, res) => {
    try {
        const data = await postModel.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

module.exports.getPost = getPost;
module.exports.getPostById = getPostById;
module.exports.getPostByUserId = getPostByUserId;
module.exports.createPost = createPost;
module.exports.updatePost = updatePost;
module.exports.deleteComment = deleteComment;
module.exports.deletePost = deletePost;
