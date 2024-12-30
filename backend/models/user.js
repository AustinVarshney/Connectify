const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    email: { type: String, required: false, unique: false },
})

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
// module.exports = mongoose.model("User", userSchema);