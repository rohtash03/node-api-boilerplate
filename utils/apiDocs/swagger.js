/**
 * This file clubs all OpenAPI spec files to generate swagger specification.
 * Swagger specs will be passed to swagger-ui GUI.
 * express-ajv-swagger-validation validates API request using the Open API specs.
 */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerValidation = require('express-ajv-swagger-validation');

const swaggerDefinition = {
  openapi: '3.0.0',
  components: {},
  info: {
    title: 'NodeJS API Boilerplate',
    version: '1.0.0',
    description:
      'API documentation with examples and model schemas. Steps to get started.\n1. Try out user post end point to create new user.\n2. Use user creds to login and generate auth token.\n3. Hit Authorize button and pass auth token to login. \n5. Now you can try out all authenticated APIs like get users.',
  },
};

const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  // Note that this path is relative to the current directory from which the Node.js is ran,
  // not the application itself.
  apis: ['./modules/**/*api.docs.yaml', './modules/**/*schema.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

swaggerValidation.init(swaggerSpec, {
  beautifyErrors: true,
  framework: 'express',
});

module.exports = {
  swaggerSpec,
  swaggerValidation,
};
