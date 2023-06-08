const router = require("express").Router();
// const middlewares = require('../middlewares/jwt.guard')
const bookingcontroller = require("../controller/bookingController")

const validation = require('../validations/validation')          
const {validate} = require('../middlewares/validationMiddleware')
const guardMiddlewares = require('../middlewares/jwt.guard')
// const {getToken, verifyToken} = require('../middlewares/jwt.guard')

// guardMiddlewares.getToken, guardMiddlewares.verifyToken, guardMiddlewares.roleGuard(['ADMIN']),
router.post('/booking/admin/create',validate(validation.bookingJoiSchema), bookingcontroller.newBooking)
router.post('/booking/admin/delete/:id', bookingcontroller.deleteBooking);
router.post('/booking/admin/update/:id',bookingcontroller.updateBooking)
router.get('/booking/admin/get', bookingcontroller.getAllBooking);

module.exports = router; 