/**
 * User model static methods
 * this here refers to user model itself
 */

/* eslint-disable func-names */

const findByUserName = function ({ username, projections = {} }) {
  return this.findOne({ username }, projections);
};

const findAllUsersWithNameLike = function ({ username, projections = {} }) {
  return this.find({ username: RegExp(`${username}`, 'i') }, projections);
};

const schemaFunction = (userSchema) => {
  /* eslint-disable no-param-reassign */
  userSchema.statics.findByUserName = findByUserName;
  userSchema.statics.findAllUsersWithNameLike = findAllUsersWithNameLike;
};

module.exports = schemaFunction;
