const { BadRequestError } = require('./errors');

/**
 * @function
 * @description handles response to be sent back after validation
 *
 * @param {String} field field that was validated
 * @param {Boolean} validationSuccess validation result
 * @param {String} value value of validated field
 * @param {String} condition condition that was satisfied
 * @param {String} condition_value value condition will was checked against
 * @param {Response} response the express response object
 *
 * @returns {Response} response the express response object
 */
const validationResponse = (
  field,
  validationSuccess,
  value,
  condition,
  condition_value,
  response
) => {
  const data = {
    error: !validationSuccess,
    field,
    field_value: value,
    condition,
    condition_value,
  };

  if (!validationSuccess) {
    throw new BadRequestError(`field ${field} failed validation.`, data);
  } else {
    return response.status(200).json({
      message: `field ${field} successfully validated.`,
      status: 'success',
      data,
    });
  }
};

module.exports = validationResponse;
