var express = require('express');
var router = express.Router();
var controller  = require('./controller');

router.get('/get', controller.get_all);
router.get('/get/:id', controller.get_one);
router.post('/create', controller.create);
router.put('/update/one/:id', controller.update_one);
router.delete('/delete', controller.delete_all);
router.delete('/delete/:id', controller.delete_one);
router.put('/update/add/:id', controller.add_test);

module.exports = router;