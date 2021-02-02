const express = require('express');
const users = require('../apiServices/user/routes');
const group = require('../apiServices/group/routes');

const router = express.Router();

router.use('/users', users);
router.use('/group', group);

module.exports = router;

