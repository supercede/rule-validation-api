const validateData = require('../validations/dataValidation');
const validationResponse = require('../utils/responseHandler');
const { getNestedfield } = require('../utils/utils');

module.exports = {
  /**
   * @function
   * @description handles validation
   *
   * @param {Request} request the express request object
   * @param {Response} response the express response object
   *
   * @returns {Function} returns a function that sends back a response
   */
  validateRule: (request, response) => {
    const {
      data,
      rule: { field, condition, condition_value },
    } = request.body;

    let value = data[field];
    if (field.includes('.')) {
      value = getNestedfield(field, data);
    }
    const validationStatus = validateData(value, condition, condition_value);

    return validationResponse(
      field,
      validationStatus,
      value,
      condition,
      condition_value,
      response
    );
  },
};
