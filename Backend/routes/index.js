const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const productsController= require('../controllers/productsController')
const orderController= require('../controllers/orderController')
const usersController= require('../controllers/usersController')
const auth = require('../middleware/auth');


module.exports = function(){

    // Customers

    router.post('/customers', customerController.newCustomer)

    router.get('/customers', auth, customerController.showCustomers)
    
    router.get('/customers/:idCustomer', customerController.showCustomer)

    router.put('/customers/:idCustomer', customerController.updateCustomer)

    router.delete('/customers/:idCustomer', customerController.deleteCustomer)

    // Products

    router.post('/products', productsController.uploadFile, productsController.newProduct)

    router.get('/products',auth, productsController.showProducts);

    router.get('/products/:idProduct', productsController.showProduct);

    router.put('/products/:idProduct', productsController.uploadFile, productsController.updateProduct);

    router.delete('/products/:idProduct', productsController.deleteProduct);

    router.post('/products/search/:query', productsController.searchProduct )

    // Orders 

    router.post('/orders/new/:idCustomer', orderController.newOrder);

    router.get('/orders',auth, orderController.showOrders);

    router.get('/orders/:idOrder', orderController.showOrder);

    router.put('/orders/:idOrder', orderController.updateOrder);
 
    router.delete('/orders/:idOrder', orderController.deleteOrder);

    // Usuarios
    router.post('/signup', usersController.registerUser);

    router.post('/login', usersController.loginUser

  );

    return router;
}