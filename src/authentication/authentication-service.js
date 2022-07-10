const config = require('../../app-config.json')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Models = require('../models');
const authenticationRepository = require('./authentication-repository')


exports.postSignIn = (username, password, result) => {
    authenticationRepository.postSignIn(username, (err, data) => {
        const user = new Models.User(data.id, data.username);

        const checkUser = bcrypt.compareSync(password, data.password);
        
        if(user && checkUser) {
            const token = jwt.sign({
                userId: user.id
            }, config.privateKey, { expiresIn: '12h' });

            const authentication = new Models.Authentication(token, user);
            return result(err, authentication);
        }
        else {
            return result({ statusCode: 404 }, null);
        }

    });
}