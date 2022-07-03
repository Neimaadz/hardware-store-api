var productRepository = require('./product-repository')



exports.getProduct = (id, result) => {
    productRepository.findById(id, (err, data) => {
        return result(err, data);
    })
}
exports.getProducts = (result) => {
    productRepository.findAll((err, data) => {
        return result(err, data);
    })
}
exports.postProduct = (product, result) => {
    productRepository.create(product, (err, data) => {
        return result(err, data);
    });
}
exports.putProduct = (id, product, result) => {
    productRepository.updataById(id, product, (err, data) => {
        return result(err, data);
    });
}
exports.deleteProduct = (id, result) => {
    productRepository.deleteById(id, (err, data) => {
        return result(err, data);
    })
}