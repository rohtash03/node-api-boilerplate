/**
 * Response handler methods to maintain common response format for all APIs.
 * Add your middlewares here if you wants to do something with data before sending it to user.
 */

const { logger } = require('../logs/logger');

const successResponse = ({
  // eslint-disable-next-line no-unused-vars
  req,
  res,
  data = {},
  code = 200,
  message = '',
}) => res.status(code).json({ data, status: { code, message } });

const errorResponse = ({
  // eslint-disable-next-line no-unused-vars
  req,
  res,
  data = {},
  error = null,
  code = 500,
  message = null,
}) => {
  if (error) {
    logger.error('API Error', error, message);
  }
  return res.status(code).json({
    data,
    status: { code, message: message || (error && error.message) || '' },
    debug:
      (typeof error === 'string' || typeof error === 'object')
      && process.env.NODE_ENV !== 'production'
        ? error
        : null,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
