const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    googleId: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
}, { collection: 'user' });


const userModel = mongoose.model("UserModel", userSchema);
module.exports = userModel;