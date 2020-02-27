const { UserModel } = require('../../../dbModels/modules/index');
const { errorResponse, successResponse } = require('../../../utils/response/response.handler');
const { jwt } = require('../../../utils/auth/authentication');
const { logger } = require('../../../utils/logs/logger');

const login = async (req, res) => {
  try {
    logger.info('Login body', req.body);
    const user = await UserModel.findByUserName({ username: req.body.username });
    if (!user) {
      throw new Error({ message: 'Invalid User' });
    }
    const validPassword = user.comparePassword(req.body.password);
    if (!validPassword) {
      throw new Error({ message: 'Invalid Password' });
    }
    // eslint-disable-next-line no-underscore-dangle
    const authToken = jwt.signToken({ _id: user._id.toString() });
    successResponse({ req, res, data: { user, authToken } });
  } catch (error) {
    errorResponse({ req, res, error });
  }
};

module.exports = {
  login,
};
