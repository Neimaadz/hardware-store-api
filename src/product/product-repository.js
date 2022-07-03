const db = require("../database-utils");



exports.findById = (id, result) => {
    db.query('SELECT * FROM products WHERE id = ?', id, (err, res) => {
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
    db.query('SELECT * FROM products', (err, res) => {
        if (err) {
            return result(err, res);
        }
        return result(err, res);
    })
}

exports.create = (product, result) => {
    db.query('INSERT INTO products SET ?', product, (err, res) => {
        if (err) {
            return result(err, res);
        }
        return result(err, res[0]);
    })
}

exports.updataById = (id, product, result) => {
    // let product;
    // this.findById(id, (err, res) => {
    //     return product = res;
    // })
    db.query('UPDATE products SET ? WHERE id = ?', [product, id], (err, res) => {
        if (err) {
            return result(err, res);
        }
        if (res.affectedRows == 0) {   // response res of MySQL query
            return result({ statusCode: 404 }, null);
        }
        return result(err, product);
    })
}

exports.deleteById = (id, result) => {
    db.query('DELETE FROM products WHERE id = ?', id, (err, res) => {
        if (err) {
            return result(err, res);
        }
        if (res.affectedRows == 0) {   // response res of MySQL query
            return result({ statusCode: 404 }, null);
        }
        return result(err, null);
    })
}
