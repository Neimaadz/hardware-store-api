const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const cors = require('cors');


// *******************************************
const config = require('./app-config.json')
const productController = require('./src/product/product-controller')
const homepageManagerController = require('./src/homepage-manager/homepage-manager-controller')
const authenticationController = require('./src/authentication/authentication-controller')


// *******************************************
const app = express()
let router = express.Router()    //permet de créer une route


// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// use to get image stored in API
app.use(config.rootAPI +'/public/images/product/', express.static("public/images/PRODUCT/"));
app.use(config.rootAPI +'/public/images/welcome/', express.static("public/images/WELCOME/"));
app.use(config.rootAPI +'/public/images/news/', express.static("public/images/NEWS/"));


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
router.post('/product', checkToken, productController.postProduct)
router.put('/product/:id', checkToken, productController.putProduct)
router.delete('/product/:id', checkToken, productController.deleteProduct)

/*
======================================================================================
====                 HOMEPAGE MANAGER                                            ====
======================================================================================
*/
router.get('/welcomeImages', checkToken, homepageManagerController.getWelcomeImages)
router.get('/newsImages', checkToken, homepageManagerController.getNewsImages)
router.put('/homepage/:id', checkToken, homepageManagerController.putHomepage)


app.use(config.rootAPI, router)   //permet de créer une route
app.listen(config.port, () => console.log('Server started on Port : ' + config.port))



