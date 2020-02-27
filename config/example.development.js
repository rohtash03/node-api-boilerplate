/**
 * Sample config file. Multiple config files can be created based on the environment.
 * eg. development, staging, production.
 * Config files have been added to gitignore to avoid pushing secret keys in repo.
 * Create file like this in config/keys folder with name development.js
 */

const configKeys = {
  port: '3000',
  mongoDbKeys: {
    host: 'localhost',
    port: '27017',
    database: 'test',
    username: '',
    password: '',
  },
  jwtSecretKey: 'MYKEY',
};

module.exports = configKeys;
