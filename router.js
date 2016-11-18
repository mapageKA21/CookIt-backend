'use strict';

const router = require('koa-router')();
const bodyParser = require('body-parser');

const usersCtrl   = require('./controllers/users.js');

router.get('/sign-in', usersCtrl.login);
router.post('/users', usersCtrl.createUser);

// router.get('/panels', authMiddleware, panelsCtrl.getPanels);
// router.post('/panels', authMiddleware, panelsCtrl.createMockPanel);

module.exports = router;
