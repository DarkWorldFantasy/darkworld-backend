const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");

const signIn = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.status(404).send("invalid email or password!");

        const password = await bcrypt.compare(req.body.password, user.password);
        if (!password)
            return res.status(404).send("invalid email or password!");

        const token = await user.genToken();
        res.send({
            message: "Successfully signed in.",
            token: token,
        });
    } catch (err) {
        console.log(err);
    }
};

const signUp = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });

        if (user) return res.status(404).send("user already existed!");

        const salt = await bcrypt.genSalt(10);
        user = new userModel(req.body);
        user.password = await bcrypt.hash(req.body.password, salt);
        const data = await user.save();

        const token = await user.genToken();
        res.send({
            message: "Successfully signed up.",
            token: token,
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.signIn = signIn;
module.exports.signUp = signUp;
