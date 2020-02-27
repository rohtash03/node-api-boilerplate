/**
 * User model schema
 */
const mongoose = require('mongoose');
const mongoToSwagger = require('mongoose-to-swagger');

const { Schema } = mongoose;

const phoneSchema = new Schema({
  number: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    alternatePhones: {
      type: [phoneSchema],
      default: [],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.index({ updatedAt: -1, username: 1 });

/**
 * Import all static and instance methods defined in separate files
 */
require('./user.static.methods')(userSchema);
require('./user.instance.methods')(userSchema);

const UserModel = mongoose.model('users', userSchema, 'users');

/**
 * mongoose-to-swagger can be used to create swagger doc from mongoose schema
 */
// eslint-disable-next-line no-unused-vars
const swaggerSchema = mongoToSwagger(UserModel);
// console.log(swaggerSchema);

module.exports = {
  UserModel,
};
