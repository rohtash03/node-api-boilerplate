/**
 * User module test cases.
 */

/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
// eslint-disable-next-line import/no-extraneous-dependencies
const chaiResponseValidator = require('chai-openapi-response-validator');
const app = require('../../../app');
const { swaggerSpec } = require('../../../utils/apiDocs/swagger');
const { loginUser } = require('../../login/tests/login.test.helper');
const { createUser } = require('./user.test.helper');

// provides satisfyApiSpec method to validate api response against swagger specs
chai.use(chaiResponseValidator(swaggerSpec));

// eslint-disable-next-line no-unused-vars
const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

describe('Users', () => {
  const user = {
    username: `node-${Date.now()}`,
    password: 'abc',
  };
  before((done) => {
    done();
  });

  describe(' /POST users', () => {
    createUser({ chai, app, user });
    loginUser({ app, chai, user });
  });

  describe(' /GET users', () => {
    it(' it should fail to get user without query', (done) => {
      chai
        .request(app)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });

    it(' it should pass to get user with query', (done) => {
      chai
        .request(app)
        .get('/users')
        .set('Authorization', user.authToken)
        .query({ name: user.username })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.satisfyApiSpec;
          done();
        });
    });
  });
});
