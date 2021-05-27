const router = require('express').Router();
const controller = require('./user.controller');

router.get('/', controller.check);

// router.get('/list', controller.list);
// router.post('/assign-admin/', controller.assignAdmin);

module.exports = router;
