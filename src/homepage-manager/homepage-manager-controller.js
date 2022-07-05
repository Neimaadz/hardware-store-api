var homePageManagerService = require('./homepage-manager-service')



exports.getWelcomeImage = (req, res) => {
    homePageManagerService.getWelcomeImage((err, data) => {
        if (err) {
            res.sendStatus(500);
        }
        else{
            res.send(data);
        }
    })
}
exports.putWelcomeImage = (req, res) => {
    homePageManagerService.putWelcomeImage(req.params.id, req.body.image, (err, data) => {
        if (err) {
            if (err.statusCode === 404) {
                res.sendStatus(404);
            }
        }
        else {
            res.send(data);
        }
    })
}
exports.getNewsImage = (req, res) => {
    homePageManagerService.getNewsImage(() => {
        if (err) {
            res.sendStatus(500);
        }
        else{
            res.send(data);
        }
    })
}
exports.putNewsImage = (req, res) => {
    homePageManagerService.putNewsImage(req.params.id, req.body.image, (err, data) => {
        if (err) {
            if (err.statusCode === 404) {
                res.sendStatus(404);
            }
        }
        else {
            res.send(data);
        }
    })
}