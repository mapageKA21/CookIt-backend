'use strict';

const router = require('koa-router')();
const bodyParser = require('body-parser');

const usersCtrl   = require('./controllers/users.js');

router.get('/sign-in', usersCtrl.login);
router.post('/users', usersCtrl.createUser);
router.get('/me',usersCtrl.checkUser);

module.exports = router;
