const { getUsers, createUser } = require('../controllers/user.controller');
const { validateAuth } = require('../../../middlewares/auth/auth.middleware');
const { swaggerValidation } = require('../../../utils/apiDocs/swagger');

module.exports = (router) => {
  /**
   * API documentation - http://localhost:3000/api-docs/#/User
   * Doc file - user/apiDocs/user.api.docs.yaml
   */
  router.get('/users', swaggerValidation.validate, validateAuth, getUsers);
  router.post('/users', createUser);
};
