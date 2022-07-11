const productService = require('./product-service')
const Models = require('../models');
const formidable = require('formidable');

// *******************************************
// parse a file upload
const filters = {
    filter: function ({name, originalFilename, mimetype}) {
      // keep only images
      return mimetype && mimetype.includes("image");
    }
};
const form = formidable({ multiples: true, uploadDir: 'public/images/', filters });



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
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.sendStatus(500);
        }
        const product = new Models.Product(null, fields.name, fields.fabricant, fields.type, fields.longueur,
            fields.diametre, fields.taille, fields.composition, fields.norme, files.image);
    
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
    });
}

exports.putProduct = (req, res) => {
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.sendStatus(500);
        }
        const product = new Models.Product(req.params.id, fields.name, fields.fabricant, fields.type, fields.longueur,
            fields.diametre, fields.taille, fields.composition, fields.norme, files.image);

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
    });
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