const db = require("../database-utils");


exports.postSignIn = (username, result) => {
    db.query('SELECT * FROM user WHERE username = ?', username, (err, res) => {
        if (err) {
            return result(err, res);
        }
        if (res.length) {
            let user = {
                idendifiant: res[0].idendifiant,
                password: res[0].password,
            };
            return result(err, user);
        }
        return result({ statusCode: 404 }, res);
    })
}
