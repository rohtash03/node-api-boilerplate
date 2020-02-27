/**
 * Add all routes here to get imported in app.js
 */
const express = require('express');

const router = express.Router();

require('../modules/user/routes/user.routes')(router);

require('../modules/login/routes/login.routes')(router);

module.exports = router;
