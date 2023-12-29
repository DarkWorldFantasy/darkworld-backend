const roleModel = require("../model/RoleModel");

const getRole = async (req, res) => {
    try {
        const role = await roleModel.find();
        if (!role) return res.status(404).send("No role found!!!");

        res.send(role);
    } catch (error) {
        res.status(404).send("something went wrong!!!");
    }
};

const createRole = async (req, res) => {
    const role = await roleModel.findOne({ name: req.body.name });
    if (role) return res.status(404).send("The role already existed!!!");

    try {
        const newRole = new roleModel(req.body);
        const data = await newRole.save();
        res.send(data);
    } catch (error) {
        res.status(404).send("something went wrong!!!");
    }
};

const deleteRole = async (req, res) => {
    try {
        const data = await roleModel.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (error) {
        res.status(404).send("something went wrong!!!");
    }
};

module.exports.getRole = getRole;
module.exports.createRole = createRole;
module.exports.deleteRole = deleteRole;
