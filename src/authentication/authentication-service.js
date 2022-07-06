
const config = require('../../app-config.json')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Models = require('../models');

var authenticationRepository = require('./authentication-repository')

exports.postSignIn = (username, password, result) => {
    authenticationRepository.postSignIn(username, (err, data) => {
        let user = data;

        const checkUser = bcrypt.compareSync(password, user.password);
        
        if(user && checkUser) {
            const token = jwt.sign({
                userId: user.id
            }, config.privateKey, { expiresIn: '12h' });

            const userPayload = new Models.User(user.id, user.username);
            const tokenUserPayload = new Models.TokenUserPayload(token, userPayload);
            return result(err, tokenUserPayload);
        }
        else {
            return result({ statusCode: 404 }, null);
        }

    });
}