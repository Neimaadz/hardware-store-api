const sharp = require('sharp');     // Resize image file
const fs = require('fs');     // allow access to File System
const path = require('path');

// *******************************************
const productRepository = require('./product-repository')
const productTypeRepository = require('./product-type-repository')



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
    const { filename: image } = product.image;
    const productImageFile = product.image;
    product.image = product.image.filename;

    this.getProductTypes((err, productTypes) => {   
        if(productTypes.filter(productType => productType.type === product.type || productType.id.toString() === product.type.toString()).length > 0){
            product.type = productTypes.find(productType => productType.type === product.type || productType.id.toString() === product.type.toString()).id;

            productRepository.create(product, (err, data) => {
                // Resize image
                sharp(productImageFile.path)
                    .resize(600, 600)
                    .jpeg({ quality: 60 })
                    .toFile(path.resolve(productImageFile.destination, 'PRODUCT', image), (err, info) => {
                        fs.unlink(productImageFile.destination + image, (error) => {})
                        
                        return result(err, data);
                    })
            });
        }
        else {
            fs.unlink(productImageFile.destination + image, (error) => {})
            return result({ statusCode: 404, message: `Product Type Not Found.` }, null);
        }
    });
}
exports.putProduct = (id, product, result) => {
    const productImageFile = product.image;

    // HANDLE REQUEST NO IMAGE FILE
    // if there is no image in request file
    if(!productImageFile) {
        this.getProduct(id, (err, data) => {
            product.image = data.image;
        })
    }
    else {
        product.image = productImageFile.filename;
        // delete old image stored on server
        this.deleteImageFileProduct(id);
    }
    
    this.getProductTypes((err, productTypes) => {
        if(productTypes.filter(productType => productType.type === product.type || productType.id.toString() === product.type.toString()).length > 0){
            product.type = productTypes.find(productType => productType.type === product.type || productType.id.toString() === product.type.toString()).id;

            productRepository.updateById(id, product, (err, data) => {
                if(!productImageFile) {
                    return result(err, data);
                }

                // Resize image
                sharp(productImageFile.path)
                    .resize(600, 600)
                    .jpeg({ quality: 60 })
                    .toFile(path.resolve(productImageFile.destination, 'PRODUCT', product.image), (err, info) => {
                        fs.unlink(productImageFile.destination + product.image, (error) => {})
                    
                        return result(err, data);
                    })
            });
        }
        else {
            fs.unlink(productImageFile.destination + image, (error) => {})
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
        fs.unlink('public/images/PRODUCT/' + data.image, (error) => {})
    })
}