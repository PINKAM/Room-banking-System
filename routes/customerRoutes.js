const router = require("express").Router();
// const middlewares = require('../middlewares/jwt.guard')
const controller = require("../controller/Controller")

const validation = require('../validations/validation')
const {validate} = require('../middlewares/validationMiddleware')

// router.get('/allcustomer',middlewares.getToken, middlewares.verfiyToken,middlewares.roleGuard(['ADMIN']),controller.getAllCustomer);
router.post('/customerSignUp', controller.customerSignup);
router.post('/login', controller.customerLogin);
router.get('/customer/admin/get', controller.getAllCustomers);
router.post('/customer/adimin/create', validate(validation.customerValidation) ,controller.createCustomer);
router.post('/customer/admin/delete/:id', controller.deleteCustomer);
router.post('/customer/admin/update/:id', controller.updateCustomer);

module.exports = router; 