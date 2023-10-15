const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    confirmpassword: String
});

const UserModel = mongoose.model("User", UserSchema); // Model name should be "User"

module.exports = UserModel;

