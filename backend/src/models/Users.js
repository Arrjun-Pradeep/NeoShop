const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    walletAddress: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Users", UserSchema);