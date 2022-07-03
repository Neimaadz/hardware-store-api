var mainPageManagerService = require('./main-page-manager-service')



exports.getWelcomeImage = (req, res) => {
    mainPageManagerService.getWelcomeImage((err, data) => {
        if (err) {
            res.sendStatus(500);
        }
        else{
            res.send(data);
        }
    })
}
exports.putWelcomeImage = (req, res) => {
    mainPageManagerService.putWelcomeImage(req.params.id, req.body.image, (err, data) => {
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
    mainPageManagerService.getNewsImage(() => {
        if (err) {
            res.sendStatus(500);
        }
        else{
            res.send(data);
        }
    })
}
exports.putNewsImage = (req, res) => {
    mainPageManagerService.putNewsImage(req.params.id, req.body.image, (err, data) => {
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