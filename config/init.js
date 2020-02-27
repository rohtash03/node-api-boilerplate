/**
 * Pick config file based on the env passed.
 * Throw error and exit process if config file is missing.
 */
/* eslint-disable global-require */
const path = require('path');
const { logger } = require('../utils/logs/logger');

const env = process.env.NODE_ENV;
const configFilePath = path.join(__dirname, 'keys', `${env}.js`);
let configKeys; // Initialised with config/keys/ env passed .js
try {
  // eslint-disable-next-line import/no-dynamic-require
  configKeys = require(configFilePath);
  if (!configKeys) {
    throw new Error('Config not found');
  }
  process.env.PORT = configKeys.port;
} catch (error) {
  logger.error(`NODE_ENV error. File named ${env}.js not found in config/keys folder`, error);
  process.exit();
}

module.exports = {
  configKeys,
};
