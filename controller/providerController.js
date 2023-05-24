const providerModel = require("../model/providerModel");

const getProvider = async (req, res) => {
    try {
        const data = await providerModel.find();
        if (!data) return res.status(404).send("no category found!");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getProviderById = async (req, res) => {
    try {
        const data = await providerModel.findById(req.params.id);
        if (!data) return res.status(404).send("no category found!");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const createProvider = async (req, res) => {
    const provider = new providerModel(req.body);

    try {
        const data = await provider.save();
        res.send(data);
    } catch (error) {
        res.status(404).send("Provider should be in at least 3 characters!");
    }
};

const updateProvider = async (req, res) => {
    try {
        const data = await providerModel.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const deleteProvider = async (req, res) => {
    try {
        const data = await providerModel.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

module.exports.getProvider = getProvider;
module.exports.getProviderById = getProviderById;
module.exports.createProvider = createProvider;
module.exports.updateProvider = updateProvider;
module.exports.deleteProvider = deleteProvider;
