const homepageManagerService = require('./homepage-manager-service')
const Models = require('../models');
const formidable = require('formidable');

// *******************************************
const filters = {
    filter: function ({name, originalFilename, mimetype}) {
      // keep only images
      return mimetype && mimetype.includes("image");
    }
};
const form = formidable({ multiples: true, uploadDir: 'public/images/', filters });



exports.getWelcomeImages = (req, res) => {
    homepageManagerService.getWelcomeImages((err, data) => {
        if (err) {
            res.sendStatus(500);
        }
        else{
            res.send(data);
        }
    })
}
exports.getNewsImages = (req, res) => {
    homepageManagerService.getNewsImages((err, data) => {
        if (err) {
            res.sendStatus(500);
        }
        else{
            res.send(data);
        }
    })
}
exports.putHomepage = (req, res) => {
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.sendStatus(500);
        }
        const homepage = new Models.Homepage(req.params.id, fields.type, files.image);
        homepageManagerService.putHomepageImage(req.params.id, homepage, (err, data) => {
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