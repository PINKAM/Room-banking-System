const router = require("express").Router();
const middlewares = require('../middlewares/jwt.guard')
const hotelcontroller = require("../controller/hotelController")

const validation = require('../validations/validation')
const {validate} = require('../middlewares/validationMiddleware')

router.get('/hotels', hotelcontroller.getHotels);
router.post('/hotels/admin/create',validate(validation.hotelValidation) ,hotelcontroller.createHotels);
router.post('/hotels/admin/delete/:id', hotelcontroller.deleteHotel);
router.post('/hotel/admin/update/:id', hotelcontroller.updateHotel);
router.get('/hotels/admin/all', hotelcontroller.getAllHotels);

module.exports = router; 