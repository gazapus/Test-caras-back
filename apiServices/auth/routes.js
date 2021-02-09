var express = require('express');
var router = express.Router();
var controller  = require('./controller');
const authValidation = require('../../middlewares/authValidation');

router.get('/signin', controller.sign_in);
router.get('/signup', [authValidation.checkDuplicatedEmail], controller.sign_up);

module.exports = router;