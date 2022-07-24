const Users = require('../services/Users');

module.exports = class UsersController {
    static async addUserIfNotAdded(req, res) {
        try {
            const response = await Users.addUserIfNotAdded(req, res);
            res.status(200).send({data: response});
        }
        catch(err) {
            res.status(500).send({message: 'Failed'});
        }
    }
}