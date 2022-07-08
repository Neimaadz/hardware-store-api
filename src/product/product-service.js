var productRepository = require('./product-repository')
var productTypeRepository = require('./productType-repository')



exports.getProductTypes = (result) => {
    productTypeRepository.findAll((err, data) => {
        return result(err, data);
    })
}



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
    this.getProductTypes((err, productTypes) => {
        // get type id
        let typeId = productTypes.find(productType => productType.type === product.type).id;
        product.type = typeId;

        productRepository.updataById(id, product, (err, data) => {
            return result(err, data);
        });
    });
    
}
exports.deleteProduct = (id, result) => {
    productRepository.deleteById(id, (err, data) => {
        return result(err, data);
    })
}