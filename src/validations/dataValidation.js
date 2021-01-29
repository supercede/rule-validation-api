/**
 * @function
 * @description carries out validation specified in rules on data object
 *
 * @param {String} field field to be checked
 * @param {String} condition condition to be satisfied
 * @param {String} condition_value value condition will be checked against
 *
 * @returns {Boolean} returns boolean to indicate if validation is successful or not
 */

const validateData = (field, condition, conditionValue) => {
  switch (condition) {
    case 'eq':
      return field === conditionValue;
    case 'neq':
      return field !== conditionValue;
    case 'gt':
      return field > conditionValue;
    case 'gte':
      return field >= conditionValue;
    case 'contains':
      return field.includes(conditionValue);
    default:
      return false;
  }
};

module.exports = validateData;
