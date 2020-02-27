/**
 * Login API test cases.
 * Creates user and then uses creds generated to login.
 */

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
// eslint-disable-next-line import/no-extraneous-dependencies
const chaiResponseValidator = require('chai-openapi-response-validator');
const app = require('../../../app');
const { swaggerSpec } = require('../../../utils/apiDocs/swagger');
const { loginUser } = require('./login.test.helper');
const { createUser } = require('../../user/tests/user.test.helper');

// provides satisfyApiSpec method to validate api response against swagger specs
chai.use(chaiResponseValidator(swaggerSpec));

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

describe('Login', () => {
  const user = {
    username: `node-${Date.now()}`,
    password: 'abc',
  };
  before((done) => {
    done();
  });

  createUser({ chai, app, user });
  loginUser({ app, chai, user });
});
