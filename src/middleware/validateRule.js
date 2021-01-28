const validateRule = require('../validations/ruleValidations');

module.exports = (request, response, next) => {
  const validation = new validateRule(request.body);
  validation.validateRule();
  next();
};
