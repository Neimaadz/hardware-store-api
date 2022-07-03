var AuthenticationService = require('./authentication-service')



exports.postSignIn = (req, res) => {
    var username = req.body.identifiant;
    var password = req.body.password;

    AuthenticationService.postSignIn(username, password, (err, data) => {
        if (err) {
            if (err.statusCode === 404) {
                res.sendStatus(404);
            }
        }
        else {
            res.send(data);
        }
    });
}