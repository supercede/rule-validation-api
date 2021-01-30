const ValidateReqBody = require('../validations/reqBodyValidation');

module.exports = (request, response, next) => {
  const validation = new ValidateReqBody(request.body);
  validation.validateRule();
  next();
};
