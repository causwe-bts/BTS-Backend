const router = require('express').Router();
const controller = require('./user.controller');
const authMiddleware = require('../../../middlewares/auth');

router.post('/signup', controller.postSignUp);
router.post('/signin', controller.postSignIn);

router.use('/orderlist', authMiddleware);
router.get('/orderlist', controller.getOrderList);

module.exports = router;
