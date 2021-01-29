const ValidateRule = require('../validations/ruleValidations');

module.exports = (request, response, next) => {
  const validation = new ValidateRule(request.body);
  validation.validateRule();
  next();
};
