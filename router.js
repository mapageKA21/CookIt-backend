'use strict';

const router = require('koa-router')();
const bodyParser = require('body-parser');

const usersCtrl   = require('./controllers/users.js');

const authMiddleware = require('./auth.js')

router.get('/login', usersCtrl.login);
router.post('/login', usersCtrl.createUser);

// router.get('/panels', authMiddleware, panelsCtrl.getPanels);
// router.post('/panels', authMiddleware, panelsCtrl.createMockPanel);

module.exports = router;
