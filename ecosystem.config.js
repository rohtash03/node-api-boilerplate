/**
 * PM2 config file.
 * Usage - pm2 start ecosystem.config.js --env development
 */
module.exports = {
  apps: [
    {
      name: 'node-b',
      script: 'bin/www', // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: '../',
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      exec_mode: 'cluster_mode',
    },
  ],
};
