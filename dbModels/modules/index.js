/**
 * Single endpoint from which all db models can be imported
 */
const { UserModel } = require('./user/user.model');

module.exports = {
  UserModel,
};
