const entertainerModel = require("../model/entertainerModel");
const formidable = require("formidable");
const fs = require("fs");

const getEntertainer = async (req, res) => {
    try {
        const data = await entertainerModel
            .find()
            .select({ profile: 0, photos: 0 })
            .sort({ _id: -1 })
            .populate("category", "name");

        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getFilterEntertainer = async (req, res) => {
    const filter = req.body;
    const arg = {};

    for (let i in filter) {
        if (filter[i].length > 0) {
            if (i === "category") {
                arg["category"] = {
                    $in: filter[i],
                };
            }
            if (i === "religion") {
                arg["religion"] = {
                    $in: filter[i],
                };
            }
            if (i === "tribe") {
                arg["tribe"] = {
                    $in: filter[i],
                };
            }
            if (i === "boobs") {
                arg["boobs"] = {
                    $in: filter[i],
                };
            }
        }
    }
    try {
        const data = await entertainerModel
            .find(arg)
            .select({ profile: 0, photos: 0 })
            .populate("category", "name");
        //console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const newArrival = async (req, res) => {
    try {
        const data = await entertainerModel
            .find()
            .select({ profile: 0, photos: 0 })
            .sort({ _id: -1 })
            .limit(3)
            .populate("category", "name");

        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getEntertainerById = async (req, res) => {
    try {
        const entertainer = await entertainerModel
            .findById(req.params.id)
            .populate("category", "name");
        res.set("Content-Type", entertainer.profile.contentType);
        res.send(entertainer);
    } catch (error) {
        console.log(error);
    }
};

const getProfliePhoto = async (req, res) => {
    try {
        const photo = await entertainerModel
            .findById(req.params.id)
            .select({ profile: 1 });
        res.set("Content-Type", photo.profile.contentType);
        res.send(photo.profile.data);
    } catch (err) {
        res.status(404).send("something weng wrong!");
    }
};

const createEntertainer = async (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(404).send("something went wrong!");

        const entertainer = new entertainerModel(fields);

        const readProfileFile = new Promise((resolve, reject) => {
            fs.readFile(files.profile.filepath, (err, result) => {
                if (err) reject(res.status(404).send("something went wrong!"));

                resolve({ data: result, contentType: files.profile.mimetype });
            });
        });

        let readPhotosFiles;
        if (files.photos.originalFilename) {
            readPhotosFiles = new Promise((resolve, reject) => {
                fs.readFile(files.photos.filepath, (err, result) => {
                    if (err)
                        reject(res.status(404).send("something went wrong!"));

                    resolve({
                        data: result,
                        contentType: files.profile.mimetype,
                    });
                });
            });
        }
        if (files.photos.length > 0) {
            readPhotosFiles = Promise.all(
                files.photos.map((photo) => {
                    return new Promise((resolve, reject) => {
                        fs.readFile(photo.filepath, (err, result) => {
                            if (err)
                                reject(
                                    res
                                        .status(404)
                                        .send("something went wrong!")
                                );

                            const obj = {
                                data: result,
                                contentType: photo.mimetype,
                            };
                            resolve(obj);
                        });
                    });
                })
            );
        }

        await Promise.all([readProfileFile, readPhotosFiles])
            .then((result) => {
                entertainer.profile = result[0];
                entertainer.photos = result[1];
            })
            .catch((err) => console.log(err));

        try {
            entertainer.save();
            res.send(fields);
        } catch (error) {
            console.log(error);
        }
    });
};

const updateEntertainer = async (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });
    form.keepExtensions = true;

    const entertainer = await entertainerModel.findById(req.params.id);

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(404).send("something went wrong!");

        for (let i in fields) {
            entertainer[i] = fields[i];
        }

        if (files.profile.originalFilename) {
            fs.readFile(files.profile.filepath, (err, result) => {
                if (err) reject(res.status(404).send("something went wrong!"));

                entertainer.profile = {
                    data: result,
                    contentType: files.profile.mimetype,
                };

                try {
                    entertainer.save();
                    res.send(fields);
                } catch (error) {
                    console.log(error);
                }
            });
        } else {
            try {
                entertainer.save();
                res.send(fields);
            } catch (error) {
                console.log(error);
            }
        }
    });
};

const addPhotosById = async (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });
    form.keepExtensions = true;

    const entertainer = await entertainerModel.findById(req.params.id);

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(404).send("something went wrong!");

        fs.readFile(files.photos.filepath, (error, result) => {
            if (error) return res.status(404).send("something went wrong!");

            const photo = {
                data: result,
                contentType: files.photos.mimetype,
            };

            entertainer.photos.push(photo);

            try {
                entertainer.save();
                res.send("successfully added!");
            } catch (error) {
                console.log(error);
            }
        });
    });
};

const deletePhotoById = async (req, res) => {
    const entertainer = await entertainerModel
        .findById(req.body.entertainerId)
        .select({ profile: 0 });

    const newData = entertainer.photos.filter(
        (photo) => photo._id != req.body.photoId
    );

    entertainer.photos = newData;

    try {
        entertainer.save();
        res.send("successfully deleted!");
    } catch (err) {
        console.log(err);
    }
};

const deleteEntertainer = async (req, res) => {
    try {
        const entertainer = await entertainerModel.findByIdAndDelete(
            req.params.id
        );
        res.send(entertainer);
    } catch (error) {
        console.log(error);
    }
};

module.exports.getEntertainer = getEntertainer;
module.exports.getFilterEntertainer = getFilterEntertainer;
module.exports.newArrival = newArrival;
module.exports.getEntertainerById = getEntertainerById;
module.exports.getProfliePhoto = getProfliePhoto;
module.exports.createEntertainer = createEntertainer;
module.exports.updateEntertainer = updateEntertainer;
module.exports.addPhotosById = addPhotosById;
module.exports.deletePhotoById = deletePhotoById;
module.exports.deleteEntertainer = deleteEntertainer;
