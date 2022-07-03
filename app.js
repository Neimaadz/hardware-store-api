const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('./app-config.json')
const jwt = require('jsonwebtoken');
const app = express()

let router = express.Router()    //permet de créer une route
var productController = require('./src/product/product-controller')
var mainPageManagerController = require('./src/main-page-manager/main-page-manager-controller')
var authenticationController = require('./src/authentication/authentication-controller')

//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


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
router.get('/products', checkToken, productController.getProducts)
router.get('product/:id', checkToken, productController.getProduct)
router.post('product/', checkToken, productController.postProduct)
router.put('product/:id', checkToken, productController.putProduct)
router.delete('product/:id', checkToken, productController.deleteProduct)

/*
======================================================================================
====                 MAIN PAGE MANAGER                                            ====
======================================================================================
*/
router.get('/welcomeImages', checkToken, mainPageManagerController.getWelcomeImage)
router.put('/welcomeImages/:id', checkToken, mainPageManagerController.putWelcomeImage)

router.get('/newsImages', checkToken, mainPageManagerController.getNewsImage)
router.put('/newsImages/:id', checkToken, mainPageManagerController.putNewsImage)


app.use(config.rootAPI, router)   //permet de créer une route
app.listen(config.port, () => console.log('Server started on Port : ' + config.port))



