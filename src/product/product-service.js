var productRepository = require('./product-repository')
var productTypeRepository = require('./product-type-repository')
var fs = require('fs');     // allow access to File System



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
    this.getProductTypes((err, productTypes) => {
        
        if(productTypes.filter(productType => productType.type === product.type || productType.id.toString() === product.type.toString()).length > 0){
            product.type = productTypes.find(productType => productType.type === product.type || productType.id.toString() === product.type.toString()).id;

            productRepository.create(product, (err, data) => {
                return result(err, data);
            });
        }
        else {
            return result({ statusCode: 404, message: `Product Type Not Found.` }, null);
        }
    });
}
exports.putProduct = (id, product, result) => {

    // HANDLE REQUEST NO IMAGE FILE
    // if there is no image in request file
    if(!product.image) {
        this.getProduct(id, (err, data) => {
            product.image = data.image;
        })
    }
    else {
        product.image = product.image.filename;

        // delete old image stored on server
        this.deleteImageFileProduct(id);
    }

    this.getProductTypes((err, productTypes) => {
        
        if(productTypes.filter(productType => productType.type === product.type || productType.id.toString() === product.type.toString()).length > 0){
            product.type = productTypes.find(productType => productType.type === product.type || productType.id.toString() === product.type.toString()).id;

            productRepository.updateById(id, product, (err, data) => {
                return result(err, data);
            });
        }
        else {
            return result({ statusCode: 404, message: `Product Type Not Found.` }, null);
        }
    });
}
exports.deleteProduct = (id, result) => {
    this.deleteImageFileProduct(id);

    productRepository.deleteById(id, (err, data) => {
        return result(err, data);
    })
}









exports.deleteImageFileProduct = (id, result) => {
    this.getProduct(id, (err, data) => {
        fs.unlink('public/images/products/' + data.image, (error) => {})
    })
}