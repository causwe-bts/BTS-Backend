const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth');
const user = require('./user');
const userinfo = require('./userinfo');
const menu = require('./menu');
const store = require('./store');

// for users
router.use('/user', user);
router.use('/userinfo', authMiddleware);
router.use('/userinfo', userinfo);

// for menu
// when ordering food, require authorization
router.use('/menu', authMiddleware);
router.use('/menu', menu);

// for store
router.use('/store', store);

module.exports = router;
