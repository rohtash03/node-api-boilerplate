/**
 * Instance methods of User model
 * this here refers to instance of User model
 */

/* eslint-disable func-names */

const bcrypt = require('bcrypt');

const comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const createUser = function () {
  return this.save();
};

const schemaFunction = (userSchema) => {
  /* eslint-disable no-param-reassign */
  userSchema.methods.comparePassword = comparePassword;
  userSchema.methods.createUser = createUser;
};

module.exports = schemaFunction;
