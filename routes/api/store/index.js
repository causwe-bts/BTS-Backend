const router = require('express').Router();
const controller = require('./store.controller');
const authMiddleware_store = require('../../../middlewares/auth_store');

router.post('/signup', controller.postSignUp);
router.post('/signin', controller.postSignIn);

router.use('/orderlist', authMiddleware_store);
router.get('/orderlist', controller.getOrderList);

router.use('/soldlist', authMiddleware_store);
router.get('/soldlist', controller.getSoldList);

router.use('/ordermanage', authMiddleware_store);
router.put('/ordermanage', controller.putOrderManage);

router.use('/storeinfo', authMiddleware_store);
router.get('/storeinfo', controller.getStoreInfo);
router.put('/storeinfo', controller.putStoreInfo);
router.put('/storeinfoadd', controller.putStoreInfoAdd);
module.exports = router;
