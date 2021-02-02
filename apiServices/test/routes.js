var express = require('express');
var router = express.Router();
var controller  = require('./controller');

router.get('/get', controller.get_all);
router.get('/get/:id', controller.get_one);
router.post('/create', controller.create);

module.exports = router;