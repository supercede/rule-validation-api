const ValidateReqBody = require('../validations/ruleValidations');

module.exports = (request, response, next) => {
  const validation = new ValidateReqBody(request.body);
  validation.validateRule();
  next();
};
