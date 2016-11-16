const User = require('./models/users.js');

module.exports = function * (next) {

  // Middleware for adding user header if it is authorized with a token

  // if (this.request.header.authorization) {
  //   let token = this.request.header.authorization.split(' ');
  //   if (token[0] === 'Bearer') {
  //     token = token[1];
  //     let user = yield User.getUserWithToken(token); //CHANGE:
  //     if (user.clearance && user.clearance !=='') {
  //       this.set('X-User',user.clearance);
  //       yield next;
  //     } else {
  //       this.status = 401;
  //       this.body = JSON.stringify({error: 'Not authorized.'});
  //     }
  //   } else if (token[0] === 'Basic') {
  //     yield next;
  //   } else {
  //     this.status = 401;
  //     this.body = JSON.stringify({error: 'Not authorized.'});
  //   }
  // } else {
  //   this.status = 401;
  //   this.body = JSON.stringify({error: 'Not authorized.'});
  // }

  yield next;

};
