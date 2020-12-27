const { login } = require('../controllers/login.controller');

// swaggerValidation.validate middleware cross checks request input with API documentation.
const { swaggerValidation } = require('../../../utils/apiDocs/swagger');

module.exports = (router) => {
  /**
   * API documentation - http://localhost:3000/api-docs/#/Login/post-login
   * Doc file - login/apiDocs/login.api.docs.yaml
   */
  router.post('/login', swaggerValidation.validate, login);
};
