/**
 * Validates JWT token
 */
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../../config/init').configKeys;

// eslint-disable-next-line consistent-return
const validateAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return next(new Error('Authorization header missing'));
    }
    token = token.replace('Bearer ', '');
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        return next(err);
      }
      // Add user object to req
      // eslint-disable-next-line no-underscore-dangle
      req.user = { _id: decoded._id };
      return next();
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  validateAuth,
};
