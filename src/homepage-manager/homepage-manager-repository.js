const db = require("../database-utils");



exports.findAllWelcomeImage  = (result) => {
    db.query('SELECT * FROM homepage', (err, res) => {
        if (err) {
            return result(err, res);
        }
        return result(err, res);
    })
}
exports.updateByIdWelcomeImage  = (id, image, result) => {
    db.query('UPDATE homepage SET image = ? WHERE id = ?', [image, id], (err, res) => {
        if (err) {
            return result(err, res);
        }
        if (res.affectedRows == 0) {   // response res of MySQL query
            return result({ statusCode: 404 }, null);
        }
        return result(err, product);
    })
}
exports.findAllNewsImage  = (result) => {
    db.query('SELECT * FROM homepage', (err, res) => {
        if (err) {
            return result(err, res);
        }
        return result(err, res);
    })
}
exports.updateByIdNewsImage  = (id, image, result) => {
    db.query('UPDATE homepage SET image = ? WHERE id = ?', [image, id], (err, res) => {
        if (err) {
            return result(err, res);
        }
        if (res.affectedRows == 0) {   // response res of MySQL query
            return result({ statusCode: 404 }, null);
        }
        return result(err, product);
    })
}