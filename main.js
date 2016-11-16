'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');

const config = require('./config.json');
const router = require('./router.js');
const db = require('./models');
const loadUserAuth = require('./auth.js');

const app = koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

const hostname = config.hostname;
const port = config.port;

db.connection.on('error', console.error.bind(console, 'connection error on db:'));
db.connection.once('open', function() {
  app.listen(config.port, function () {
    console.log('Server listening on port ' + config.port);
  });
});
