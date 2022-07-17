const sharp = require('sharp');     // Resize image file
const fs = require('fs');     // allow access to File System
const path = require('path');

// *******************************************
const destination = 'public/images/'
const welcomeFinalPath = destination + 'WELCOME/';
const newsFinalPath = destination + 'NEWS/';
const homepageManagerRepository = require('./homepage-manager-repository')
const homepageTypeRepository = require('./homepage-type-repository')



exports.getHomepageTypes = (result) => {
    homepageTypeRepository.findAll((err, data) => {
        return result(err, data);
    })
}




exports.getWelcomeImages = (result) => {
    homepageManagerRepository.findAllWelcomeImage((err, data) => {
        return result(err, data);
    })
}
exports.getNewsImages = (result) => {
    homepageManagerRepository.findAllNewsImage((err, data) => {
        return result(err, data);
    })
}
exports.getHomepageImage = (id, result) => {
    homepageManagerRepository.findById(id, (err, data) => {
        return result(err, data);
    })
}
exports.getHomepageImages = (result) => {
    homepageManagerRepository.findAll((err, data) => {
        return result(err, data);
    })
}
exports.putHomepageImage = (id, homepage, result) => {
    var filename;
    var oldPathTMP;
    var newPathTMP;
    var finalPath;
    const homepageImageFile = homepage.image;
    
    // HANDLE REQUEST NO IMAGE FILE
    // if there is no image in request file
    if(!homepageImageFile) {
        this.getHomepageImage(id, (err, data) => {
            homepage.image = data.image;
        })
    }
    else {
        filename = generateFilename(homepage.image.originalFilename)
        oldPathTMP = homepage.image.filepath;
        newPathTMP = destination + filename;
        homepage.image = filename;
    }
    
    this.getHomepageTypes((err, homepageType) => {
        if(homepageType.filter(homepageType => homepageType.type === homepage.type || homepageType.id.toString() === homepage.type.toString()).length > 0){
            homepage.type = homepageType.find(homepageType => homepageType.type === homepage.type || homepageType.id.toString() === homepage.type.toString()).id;


            if(homepage.type.toString() === "1" || homepage.type.toString() === "welcome"){
                finalPath = welcomeFinalPath;
            }
            else {
                finalPath = newsFinalPath;
            }

            // delete old image stored on server
            this.deleteImageFileHomepage(id, finalPath);

            homepageManagerRepository.updateById(id, homepage, (err, data) => {
                if(!homepageImageFile) {
                    return result(err, data);
                }

                // Move and save file to new path
                fs.rename(oldPathTMP, newPathTMP, () => {
                    // Resize image
                    sharp(newPathTMP)
                        .resize(1920, 1080, {
                            fit: sharp.fit.fill
                        })
                        .jpeg({ quality: 70 })
                        .toFile(path.resolve(finalPath, homepage.image), (err, info) => {
                            // delete original unresized file
                            fs.unlink(newPathTMP, (error) => {})
                            
                            return result(err, data);
                        })
                });
            });
        }
        else {
            fs.unlink(oldPathTMP, (error) => {})   // delete generated raw image file
            return result({ statusCode: 404, message: `Homepage Type Not Found.` }, null);
        }
    });
}







exports.deleteImageFileHomepage = (id, finalPath, result) => {
    this.getHomepageImage(id, (err, data) => {
        fs.unlink(path.resolve(finalPath, data.image), (error) => {})
    })
}
function generateFilename(originalFilename) {
    return 'image-' + Date.now() + path.extname(originalFilename);
}