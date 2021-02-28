var express = require('express');
var router = express.Router();
var controller  = require('./controller');
const authValidation = require('../../middlewares/authValidation');
const mailer = require('../../middlewares/mailer');

router.get('/get', controller.get_all);
router.post('/create', [authValidation.verifyToken, controller.create, mailer.sendEmailChangeToOriginal], mailer.sendEmailChangeToNew);
router.put('/confirm/:id', controller.confirm);
router.delete('/delete/:id', controller.delete_one);

module.exports = router;