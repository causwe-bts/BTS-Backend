const router = require('express').Router();
const controller = require('./store.controller');
const auth = require('../../../middlewares/auth');

router.post('/signup', controller.postSignUp);
router.post('/signin', controller.postSignIn);

router.get('/orderlist', auth, controller.getOrderList);
router.get('/soldlist', auth, controller.getSoldList);
router.post('/ordermanage', auth, controller.postOrderManage);
router.get('/storeinfo', auth, controller.getStoreInfo);
router.put('/storeinfo', auth, controller.putStoreInfo);

module.exports = router;
