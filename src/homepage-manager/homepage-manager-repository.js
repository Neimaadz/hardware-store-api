const db = require("../database-utils");



exports.findAllWelcomeImage  = (result) => {
    type = 1;
    db.query('SELECT * FROM homepage WHERE type = ?', type, (err, res) => {
        if (err) {
            return result(err, res);
        }
        return result(err, res);
    })
}
exports.findAllNewsImage  = (result) => {
    type = 2;
    db.query('SELECT * FROM homepage WHERE type = ?', type, (err, res) => {
        if (err) {
            return result(err, res);
        }
        return result(err, res);
    })
}
exports.findById = (id, result) => {
    db.query('SELECT homepage.*, homepage_type.type FROM homepage INNER JOIN homepage_type ON homepage.type = homepage_type.id WHERE homepage.id = ?', id, (err, res) => {
        if (err) {
            return result(err, res);
        }
        if (res.length) {
            return result(err, res[0]);
        }
        return result({ statusCode: 404 }, res);
    });
}
exports.findAll = (result) => {
    db.query('SELECT homepage.*, homepage_type.type FROM homepage INNER JOIN homepage_type ON homepage.type = homepage_type.id', (err, res) => {
        if (err) {
            return result(err, res);
        }
        return result(err, res);
    })
}
exports.updateById = (id, homepage, result) => {
    db.query('UPDATE homepage SET ? WHERE id = ?', [homepage, id], (err, res) => {
        if (err) {
            return result(err, res);
        }
        if (res.affectedRows == 0) {   // response res of MySQL query
            return result({ statusCode: 404 }, null);
        }
        return result(err, homepage);
    })
}

