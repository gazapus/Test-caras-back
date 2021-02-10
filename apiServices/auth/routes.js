var express = require('express');
var router = express.Router();
var controller  = require('./controller');
const authValidation = require('../../middlewares/authValidation');

router.post('/signin', controller.sign_in);
router.post('/signup', [authValidation.checkDuplicatedEmail], controller.sign_up);
router.post('/isLogged', [authValidation.verifyToken], controller.sign_up);


module.exports = router;