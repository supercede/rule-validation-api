const validationResponse = (
  field,
  validationSuccess,
  value,
  condition,
  condition_value,
  response
) => {
  let message, statusCode, status;
  if (!validationSuccess) {
    message = `field ${field} failed validation.`;
    statusCode = 400;
    status = 'error';
  } else {
    message = `field ${field} successfully validated.`;
    statusCode = 200;
    status = 'success';
  }

  return response.status(statusCode).json({
    message,
    status,
    data: {
      validation: {
        error: !validationSuccess,
        field,
        field_value: value,
        condition,
        condition_value,
      },
    },
  });
};

module.exports = validationResponse;
