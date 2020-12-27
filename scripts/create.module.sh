#!/bin/bash
####################################
#
# This script generates folder structure of a new module
# It takes module name as argument and creates routes and controllers
# Sample command to create 'order' module - npm run create-module order
#
####################################

if [ -z $1 ]
then
  echo Pass module name in params
  exit
fi

cd modules

# Creates folder and subfolders inside modules directory
mkdir $1
cd $1

mkdir controllers
touch controllers/$1.controller.js

# Add some starting code to newly generated controller
echo "const { YourModel } = require('../../../dbModels/modules/index');
const { errorResponse, successResponse } = require('../../../utils/response/response.handler');
const { logger } = require('../../../utils/logs/logger');

const getFunction = async (req, res) => {
  try {
    return successResponse({ req, res, data: {} });
  } catch (error) {
    return errorResponse({ req, res, error });
  }
};

module.exports = {
  getFunction,
};" >> controllers/$1.controller.js

mkdir routes
touch routes/$1.routes.js
echo "const { getFunction } = require('../controllers/$1.controller');
const { validateAuth } = require('../../../middlewares/auth/auth.middleware');
const { swaggerValidation } = require('../../../utils/apiDocs/swagger');

module.exports = (router) => {
  /**
   * API documentation - http://localhost:3000/api-docs/#/Order
   * Doc file - $1/apiDocs/$1.api.docs.yaml
   */
  router.get('/your-path', swaggerValidation.validate, validateAuth, getFunction);
};" >> routes/$1.routes.js

mkdir apiDocs
touch apiDocs/$1.api.docs.yaml
echo "/$1:" >> apiDocs/$1.api.docs.yaml

mkdir helpers
touch helpers/$1.helper.js

mkdir tests
touch tests/$1.tests.js

cd ../../

# Add route to index file
sed -i "/module.exports/i require('../modules/$1/routes/$1.routes')(router);\n" routes/index.js

echo Created, Refresh repo.

