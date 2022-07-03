var mainPageManagerRepository = require('./main-page-manager-repository')



exports.getWelcomeImage = (result) => {
    mainPageManagerRepository.findAllWelcomeImage((err, data) => {
        return result(err, data);
    })
}
exports.putWelcomeImage = (id, image, result) => {
    mainPageManagerRepository.updateByIdWelcomeImage(id, image, (err, data) => {
        return result(err, data);
    })
}
exports.getNewsImage = (result) => {
    mainPageManagerRepository.findAllNewsImage((err, data) => {
        return result(err, data);
    })
}
exports.putNewsImage = (id, image, result) => {
    mainPageManagerRepository.updateByIdNewsImage(id, image, (err, data) => {
        return result(err, data);
    })
}