const homePageManagerRepository = require('./homepage-manager-repository')



exports.getWelcomeImage = (result) => {
    homePageManagerRepository.findAllWelcomeImage((err, data) => {
        return result(err, data);
    })
}
exports.putWelcomeImage = (id, image, result) => {
    homePageManagerRepository.updateByIdWelcomeImage(id, image, (err, data) => {
        return result(err, data);
    })
}
exports.getNewsImage = (result) => {
    homePageManagerRepository.findAllNewsImage((err, data) => {
        return result(err, data);
    })
}
exports.putNewsImage = (id, image, result) => {
    homePageManagerRepository.updateByIdNewsImage(id, image, (err, data) => {
        return result(err, data);
    })
}