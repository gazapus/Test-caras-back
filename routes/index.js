const express = require('express');
const users = require('../apiServices/user/routes');
const group = require('../apiServices/group/routes');
const test = require('../apiServices/test/routes');

const router = express.Router();

router.use('/users', users);
router.use('/group', group);
router.use('/test', test);

module.exports = router;

