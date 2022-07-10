var productService = require('./product-service')
const Models = require('../models');


exports.getProductTypes = (req, res) => {
    productService.getProductTypes((err, data) => {
        if (err) {
            res.sendStatus(500);
        }
        else{
            res.send(data);
        }
    })
}

exports.getProduct = (req, res) => {
    productService.getProduct(req.params.id, (err, data) => {
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

exports.getProducts = (req, res) => {
    productService.getProducts((err, data) => {
        if (err) {
            res.sendStatus(500);
        }
        else{
            res.send(data);
        }
    })
}

exports.postProduct = (req, res) => {
    const product = new Models.Product(null, req.body.name, req.body.fabricant, req.body.type, req.body.longueur,
        req.body.diametre, req.body.taille, req.body.composition, req.body.norme, req.file);

    productService.postProduct(product, (err, data) => {
        if (err) {
            if (err.statusCode === 404) {
                res.status(404).json(err.message);
            }
            else {
                res.sendStatus(500);
            }
        }
        else{
            res.send(data);
        }
    })
}

exports.putProduct = (req, res) => {
    const product = new Models.Product(req.params.id, req.body.name, req.body.fabricant, req.body.type, req.body.longueur,
        req.body.diametre, req.body.taille, req.body.composition, req.body.norme, req.file);

    productService.putProduct(req.params.id, product, (err, data) => {
        if (err) {
            if (err.statusCode === 404) {
                res.status(404).json(err.message);
            }
        }
        else {
            res.send(data);
        }
    })
}

exports.deleteProduct = (req, res) => {
    productService.deleteProduct(req.params.id, (err, data) => {
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