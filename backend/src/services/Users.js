const UsersSchema = require('../models/Users');

module.exports = class Users {
    static async addUserIfNotAdded(req, res) {
        try {

            const response = await UsersSchema.find();
            let flag = false;
            const checkIfWalletAlreadyExists = (val, ind, array) => {
                if(val.walletAddress === req.body.walletAddress) {
                    flag = true;
                } 
            };
            response.forEach(checkIfWalletAlreadyExists);
            if(flag) {
                return;
            } else {
                const body = {
                    walletAddress: req.body.walletAddress
                };
                const data = await new UsersSchema(body).save();
                return data;
            }
        }
        catch(err) {
            throw err;
        }
    }
}