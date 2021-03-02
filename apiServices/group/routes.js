var express = require('express');
var router = express.Router();
var controller  = require('./controller');
const authValidation = require('../../middlewares/authValidation');

router.get('/get', controller.get_all);
router.get('/get/one/:id', controller.get_one);
router.get('/get/universal', [authValidation.verifyToken], controller.get_universal);
router.post('/create', [authValidation.verifyToken], controller.create);
router.put('/update/one/:id', controller.update_one);
router.delete('/delete', controller.delete_all);
router.delete('/delete/:id', controller.delete_one);
router.put('/update/add/:id', controller.add_test);
router.put('/update/remove/:id', controller.remove_test);

module.exports = router;