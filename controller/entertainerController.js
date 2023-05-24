const { profile } = require("console");
const entertainerModel = require("../model/entertainerModel");
const formidable = require("formidable");
const fs = require("fs");
const { resolve } = require("path");

const getEntertainer = async (req, res) => {
    try {
        const data = await entertainerModel
            .find()
            .select({ profile: 0, photos: 0 })
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

        console.log(files);

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

        let readProfileFile;
        if (files.profile.originalFilename) {
            readProfileFile = new Promise((resolve, reject) => {
                fs.readFile(files.profile.filepath, (err, result) => {
                    if (err)
                        reject(res.status(404).send("something went wrong!"));

                    resolve({
                        data: result,
                        contentType: files.profile.mimetype,
                    });
                });
            });
        }

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
                            resolve({
                                data: result,
                                contentType: photo.mimetype,
                            });
                        });
                    });
                })
            );
        }
        await Promise.all([readProfileFile, readPhotosFiles]).then((values) => {
            if (values[0] != undefined) entertainer.profile = values[0];
            if (values[1] != undefined) entertainer.photos = values[1];
        });

        try {
            entertainer.save();
            res.send(fields);
        } catch (error) {
            console.log(error);
        }
    });
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
module.exports.getEntertainerById = getEntertainerById;
module.exports.getProfliePhoto = getProfliePhoto;
module.exports.createEntertainer = createEntertainer;
module.exports.updateEntertainer = updateEntertainer;
module.exports.deleteEntertainer = deleteEntertainer;
