const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    name: { type: String, minLength: 4, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, minLength: 6, required: true },
    role: { type: String, default: "user" },
});

userSchema.methods.genToken = async function () {
    const token = await jwt.sign(
        {
            id: this._id,
            name: this.name,
            email: this.email,
            role: this.role,
        },
        process.env.SECRETKEY
    );
    return token;
};

const userModel = model("user", userSchema);

module.exports = userModel;
