const express = require('express');
const path = require('path');
const morganLogger = require('morgan');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const uuid = require('uuid');
const httpContext = require('express-http-context');
const compression = require('compression');
const oatts = require('oatts');

const { mongoDbKeys } = require('./config/init').configKeys;
const { mongoInit } = require('./dbModels/connection');
const { swaggerSpec, swaggerValidation } = require('./utils/apiDocs/swagger');
const { errorResponse } = require('./utils/response/response.handler');
const { logger } = require('./utils/logs/logger');
const { allowCrossDomain } = require('./middlewares/cors/cors.middleware');

mongoInit({ db: mongoDbKeys, logger });

const routes = require('./routes/index');

const app = express();

app.use(allowCrossDomain);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Morgan for API access logs
app.use(morganLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// swagger url and specs setup
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  }),
);

/**
 * oatts module to generate automated test cases in tests folder.
 * These test cases are for experiment purpose only and are not covered in
 * npm run test commmand.
 */
oatts.generate(swaggerSpec, { writeTo: 'tests', host: `localhost:${process.env.PORT}` });

// gzip, deflate compression of API response to reduce data transfer over internet
app.use(compression());

/**
 * Adding unique id to each request.
 * All logs generated through same API call will have this common unique id.
 */
app.use(httpContext.middleware);
app.use((req, res, next) => {
  httpContext.set('reqId', uuid.v1());
  next();
});

app.use('/', routes);

// 404 handler if requested url is not found
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => errorResponse({
  code: 404,
  req,
  res,
  message: 'Route not found',
}));

// error handler for API validation errors
app.use((err, req, res, next) => {
  if (err instanceof swaggerValidation.InputValidationError) {
    return errorResponse({
      code: 400,
      req,
      res,
      message: JSON.stringify(err.errors),
    });
  }
  return next(err);
});

// error handler for unhandled server errors
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => errorResponse({
  code: 500,
  req,
  res,
  error,
  message: error.message,
}));

module.exports = app;
