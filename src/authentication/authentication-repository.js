const db = require("../db");


exports.postSignIn = (username, result) => {
    db.query('SELECT * FROM connexion WHERE identifiant = ?', username, (err, res) => {
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
