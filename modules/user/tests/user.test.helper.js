/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const createUser = ({ chai, app, user }) => {
  const { expect } = chai;
  it(' it should pass to create new user', (done) => {
    chai
      .request(app)
      .post('/users')
      .send({
        user,
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res).to.satisfyApiSpec;
        done();
      });
  });
};

module.exports = {
  createUser,
};
