const bunyan = require('bunyan');
const httpContext = require('express-http-context');

const log = bunyan.createLogger({
  name: 'node-b',
});

/**
 * @description Function to add unique request id to log's text so that all logs
 *  for same request can be combined.
 * @param {string} message - text
 */
const formatMessage = (message) => {
  const reqId = httpContext.get('reqId');
  // eslint-disable-next-line no-param-reassign
  message = reqId ? `${message} reqId: ${reqId}` : message;
  return message;
};

const logger = {
  debug(msg, obj) {
    log.debug(formatMessage(msg), obj || '');
  },
  info(msg, obj) {
    log.info(formatMessage(msg), obj || '');
  },
  error(msg, obj) {
    log.error(formatMessage(msg), obj || '');
  },
};

module.exports = { logger };
