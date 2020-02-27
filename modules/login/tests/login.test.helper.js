const _ = require('lodash');

/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const loginUser = ({ chai, app, user }) => {
  const { expect } = chai;
  it(' it should pass to login user', (done) => {
    chai
      .request(app)
      .post('/login')
      .send({
        username: user.username,
        password: user.password,
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res).to.satisfyApiSpec;
        // eslint-disable-next-line no-param-reassign
        user.authToken = _.get(res, 'body.data.authToken', null);
        done();
      });
  });
};

module.exports = {
  loginUser,
};
