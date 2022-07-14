const sharp = require('sharp');     // Resize image file
const fs = require('fs');     // allow access to File System
const path = require('path');

// *******************************************
const destination = 'public/images/'
const finalPath = destination + 'PRODUCT/';
const productRepository = require('./product-repository')
const productTypeRepository = require('./product-type-repository')


/* Get all products types
 *
 * Return an array of objects
 */
exports.getProductTypes = (result) => {
    productTypeRepository.findAll((err, data) => {
        return result(err, data);
    })
}


/* Get one product by his ID
 * Params(id)
 * Return an object Product
 */
exports.getProduct = (id, result) => {
    productRepository.findById(id, (err, data) => {
        return result(err, data);
    })
}


/* Get all products
 * Params()
 * Return an array of object Product
 */
exports.getProducts = (result) => {
    productRepository.findAll((err, data) => {
        return result(err, data);
    })
}


/* Create a product
 * Params()
 * Return
 */
exports.postProduct = (product, result) => {
    var filename = generateFilename(product.image.originalFilename)
    var oldPathTMP = product.image.filepath;
    var newPathTMP = destination + filename;
    product.image = filename;

    this.getProductTypes((err, productTypes) => {   
        if(productTypes.filter(productType => productType.type === product.type || productType.id.toString() === product.type.toString()).length > 0){
            product.type = productTypes.find(productType => productType.type === product.type || productType.id.toString() === product.type.toString()).id;

            productRepository.create(product, (err, data) => {
                // Move and save file to new path
                fs.rename(oldPathTMP, newPathTMP, () => {
                    // Resize image
                    sharp(newPathTMP)
                        .resize(600, 600)
                        .jpeg({ quality: 60 })
                        .toFile(path.resolve(finalPath, product.image), (err, info) => {
                            // delete original unresized file
                            fs.unlink(newPathTMP, (error) => {})
                            
                            return result(err, data);
                        })
                });
            });
        }
        else {
            fs.unlink(oldPathTMP, (error) => {})   // delete generated raw image file
            return result({ statusCode: 404, message: `Product Type Not Found.` }, null);
        }
    });
}


/* Update a product by his ID
 * Params(id, product)
 * Return an object Product
 */
exports.putProduct = (id, product, result) => {
    var filename;
    var oldPathTMP;
    var newPathTMP;
    const productImageFile = product.image;

    // HANDLE REQUEST NO IMAGE FILE
    // if there is no image in request file
    if(!productImageFile) {
        this.getProduct(id, (err, data) => {
            product.image = data.image;
        })
    }
    else {
        filename = generateFilename(product.image.originalFilename)
        oldPathTMP = product.image.filepath;
        newPathTMP = destination + filename;
        product.image = filename;
    }
    
    this.getProductTypes((err, productTypes) => {
        if(productTypes.filter(productType => productType.type === product.type || productType.id.toString() === product.type.toString()).length > 0){
            product.type = productTypes.find(productType => productType.type === product.type || productType.id.toString() === product.type.toString()).id;

            // delete old image stored on server
            this.deleteImageFileProduct(id);

            productRepository.updateById(id, product, (err, data) => {
                if(!productImageFile) {
                    return result(err, data);
                }

                // Move and save file to new path
                fs.rename(oldPathTMP, newPathTMP, () => {
                    // Resize image
                    sharp(newPathTMP)
                        .resize(600, 600)
                        .jpeg({ quality: 60 })
                        .toFile(path.resolve(finalPath, product.image), (err, info) => {
                            // delete original unresized file
                            fs.unlink(newPathTMP, (error) => {})
                            
                            return result(err, data);
                        })
                });
            });
        }
        else {
            fs.unlink(oldPathTMP, (error) => {})   // delete generated raw image file
            return result({ statusCode: 404, message: `Product Type Not Found.` }, null);
        }
    });
    
}


/* Delete a product by his ID
 * Params(id)
 * Return
 */
exports.deleteProduct = (id, result) => {
    this.deleteImageFileProduct(id);

    productRepository.deleteById(id, (err, data) => {
        return result(err, data);
    })
}









exports.deleteImageFileProduct = (id, result) => {
    this.getProduct(id, (err, data) => {
        fs.unlink(path.resolve(finalPath, data.image), (error) => {})
    })
}
function generateFilename(originalFilename) {
    return 'image-' + Date.now() + path.extname(originalFilename);
}