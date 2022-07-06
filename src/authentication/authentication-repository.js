const db = require("../database-utils");


exports.postSignIn = (username, result) => {
    db.query('SELECT * FROM user WHERE username = ?', username, (err, res) => {
        if (err) {
            return result(err, res);
        }
        if (res.length) {
            let user = {
                id: res[0].id,
                username: res[0].username,
                password: res[0].password,
            };
            return result(err, user);
        }
        return result({ statusCode: 404 }, res);
    })
}
