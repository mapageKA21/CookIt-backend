'use strict';

const passport = require('koa-passport');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const parse =  require('co-body');

const User = require('../models').models.User;

const SALT_ROUNDS = 10;

exports.login = function* (next) {
  let ctx = this;
  yield passport.authenticate('basic', { session: false },
  function *(error,user) {
    if (user) {
      ctx.status = 200;
      yield ctx.body = { id: user._id, username: user.username, auth_token: user.token };
    }
    else {
      ctx.status = 401;
      ctx.body = { error: 'Wrong user or password.' };
    }
  });
};

exports.createUser = function* (next) {

  let body = yield parse.json(this);
  if (
    body === undefined ||
    body.username === undefined ||
    body.password === undefined
  ) {
    this.status = 400;
    this.body = '400 Bad Request';
  } else {
    let newToken = uuid.v4();
    let hashedPass = bcrypt.hashSync(body.password, SALT_ROUNDS);
    let user = { username: body.username, hash: hashedPass, token: newToken };
    user = new User(user);
    try {
      let res = yield user.save();
      this.status = 200;
      this.body = {id: res._id, username: res.username, auth_token: res.token};
    } catch (err) {
      this.status = 500;
      if (err.errmsg && err.errmsg.indexOf('duplicate key error index')!==-1) err = {error: 'Username is already used.'};
      this.body = err;
    }
  }
};

exports.checkUser = function* (next) {
  let ctx = this;
  yield passport.authenticate('bearer', { session: false },
  function *(error,user) {
    if (user) {
      ctx.status = 200;
      yield ctx.body = { id: user._id, username: user.username, auth_token: user.token };
    }
    else {
      ctx.status = 401;
      ctx.body = { error: 'Wrong token.' };
    }
  });
};


exports.delUser = function* (next) {
  let ctx = this;
  yield passport.authenticate('bearer', { session: false },
  function *(error,user) {
    if (user) {
      yield user.remove();
      ctx.status = 200;
      ctx.body = { status: 'User deleted' };
    }
    else {
      ctx.status = 401;
      ctx.body = { error: 'Wrong token.' };
    }
  });
};
