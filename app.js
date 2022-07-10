const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require("multer");
const path = require('path');


// *******************************************
const config = require('./app-config.json')
const helpers = require('./src/helpers');
const productController = require('./src/product/product-controller')
const homePageManagerController = require('./src/homepage-manager/homepage-manager-controller')
const authenticationController = require('./src/authentication/authentication-controller')


// *******************************************
const app = express()
let router = express.Router()    //permet de créer une route
var storage = multer.diskStorage({        //Upload une image
    destination: function(req, file, cb) {
        cb(null, 'public/images/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
// 'image' is the name of our file input field in the HTML form
var uploadImageFile = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('image');


// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// use to get image stored in API
app.use(config.rootAPI +'/public/images/product/', express.static("public/images/PRODUCT/"));


const checkToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]  // recup element séparer par un espace

        req.token = jwt.verify(token, config.privateKey) // on ajout token dans req
        next();
    }
    catch (error) {
        res.status(401).json({error : "Invalid token"});
    }
}



/*
======================================================================================
====                 AUTHENTICATION                                               ====
======================================================================================
*/
router.post('/authentication', authenticationController.postSignIn)


/*
======================================================================================
====                 PRODUCTS                                                     ====
======================================================================================
*/
router.get('/productTypes', productController.getProductTypes)

router.get('/products', productController.getProducts)
router.get('/product/:id', productController.getProduct)
router.post('/product', [checkToken, uploadImageFile], productController.postProduct)
router.put('/product/:id', [checkToken, uploadImageFile], productController.putProduct)
router.delete('/product/:id', checkToken, productController.deleteProduct)

/*
======================================================================================
====                 MAIN PAGE MANAGER                                            ====
======================================================================================
*/
router.get('/welcomeImages', checkToken, homePageManagerController.getWelcomeImage)
router.put('/welcomeImages/:id', checkToken, homePageManagerController.putWelcomeImage)

router.get('/newsImages', checkToken, homePageManagerController.getNewsImage)
router.put('/newsImages/:id', checkToken, homePageManagerController.putNewsImage)


app.use(config.rootAPI, router)   //permet de créer une route
app.listen(config.port, () => console.log('Server started on Port : ' + config.port))



