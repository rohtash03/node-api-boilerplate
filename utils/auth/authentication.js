/**
 * Generates JWT token for payload passed
 */
const JWT = require('jsonwebtoken');
const { jwtSecretKey } = require('../../config/init').configKeys;

const jwt = {
  signToken: payload => JWT.sign(
    {
      ...payload,
    },
    jwtSecretKey,
    { expiresIn: 30 * 60 * 60 * 24 },
  ),
};

module.exports = { jwt };
