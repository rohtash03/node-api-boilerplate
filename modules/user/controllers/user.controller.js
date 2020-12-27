const bcrypt = require('bcrypt');
const { errorResponse, successResponse } = require('../../../utils/response/response.handler');
const { UserModel } = require('../../../dbModels/modules/index');
const { logger } = require('../../../utils/logs/logger');

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAllUsersWithNameLike({ username: req.query.name });
    return successResponse({ req, res, data: { users } });
  } catch (error) {
    return errorResponse({ req, res, error });
  }
};

const createUser = async (req, res) => {
  try {
    // logger sample to show auto generated req id in both logs
    logger.info('createUser body', req.body);
    const user = new UserModel(req.body.user);
    user.password = bcrypt.hashSync(user.password, 10);
    const userData = await user.createUser();
    logger.info('createUser created', userData);
    return successResponse({ req, res, data: { user: userData } });
  } catch (error) {
    return errorResponse({ req, res, error });
  }
};

module.exports = {
  getUsers,
  createUser,
};
