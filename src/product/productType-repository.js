const db = require("../database-utils");



exports.findAll = (result) => {
    db.query('SELECT * FROM product_type', (err, res) => {
        if (err) {
            return result(err, res);
        }
        return result(err, res);
    })
}