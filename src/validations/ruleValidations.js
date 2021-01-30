const { BadRequestError } = require('../utils/errors');

class ValidateReqBody {
  /**
   *Creates an instance of validateRule.
   * @param {Object} body the request body containing rules and data
   * @memberof validateRule
   */
  constructor(body) {
    this.body = body;
    this.rule = body.rule;
    this.data = body.data;
  }

  /**
   * @method
   * @description checks if fields are present in an object
   *
   * @param {Object} obj the object to be checked for the required fields
   * @param {Array} fields an array of strings that are required
   *
   * @returns {Error} Error if a field is not present in the object
   * @memberof validateRule
   */
  required(obj, fields) {
    for (const field of fields) {
      if (obj[`${field}`] == null) {
        throw new BadRequestError(`${field} is required.`);
      }
    }
  }

  /**
   * @method
   * @description checks if the passed field is a valid JSON object
   *
   * @param {Object} obj the object to be validated
   * @param {String} key the key of the object
   *
   * @returns {Error} Error if a field is not present in the object
   * @memberof validateRule
   */
  isJSONObject(obj, key) {
    if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) {
      throw new BadRequestError(`${key} should be an object.`);
    }
  }

  /**
   * @method
   * @description checks if all required fields are present in the provided object
   *
   * @param {Object} rule the object to be validated
   *
   * @returns {Function} calls the this.required function
   * @memberof validateRule
   */
  validateRuleFields(rule) {
    const requiredFields = ['field', 'condition', 'condition_value'];
    this.required(rule, requiredFields);
  }

  /**
   * @method
   * @description validates nesting level
   *
   * @param {String} fieldName the fieldname to be validated
   *
   * @returns {Error} returns an error if the nesting level is more than 2
   * @memberof validateRule
   */
  checkNestingLevel(fieldName) {
    if (typeof fieldName !== 'string') {
      throw new BadRequestError('field should be a string.');
    }
    const nestLevel = fieldName.split('.').length;

    // 0 level nesting = array Length 1, 1 level = arrLength 2...
    if (nestLevel > 3) {
      throw new BadRequestError(
        `field value ${fieldName} contains more than 2 levels of nesting.`
      );
    }
  }

  /**
   * @method
   * @description validates condition passed in rule object
   *
   * @param {String} condition the condition to be validated
   *
   * @returns {Error} returns an error if the condition is among the allowed parameters
   * @memberof validateRule
   */
  validateRuleCondition(condition) {
    const allowedFields = ['eq', 'neq', 'gt', 'gte', 'contains'];
    if (!allowedFields.includes(condition))
      throw new BadRequestError(`invalid condition: '${condition}'.`);
  }

  /**
   * @method
   * @description checks if field to be validated exists in data object
   *
   * @param {String} field field to be checked
   * @param {Object} data the data object
   *
   * @returns {Error} returns an error if the condition is among the allowed parameters
   * @memberof validateRule
   */
  checkIfRuleFieldExists(field, data) {
    // check index if data is array or string
    if (typeof data === 'string' || Array.isArray(data)) {
      // array/string can only be indexed by number
      if (isNaN(field)) {
        throw new BadRequestError(`field ${field} is missing from data.`);
      }

      if (data[`${field}`] == null) {
        throw new BadRequestError(`field ${field} is missing from data.`);
      }
    }

    // check key if data is object
    const nestLevel = field.split('.');
    if (nestLevel.length === 1) {
      if (!data[`${field}`]) {
        throw new BadRequestError(`field ${field} is missing from data.`);
      }
    } else {
      for (const level of nestLevel) {
        if (!data || !data.hasOwnProperty(level)) {
          throw new BadRequestError(`field ${level} is missing from data.`);
        }
        data = data[level];
      }
    }
  }

  /**
   * @method
   * @description checks if data is of the specified type (array, string, object)
   *
   * @param {String} field data to be validated
   *
   * @returns {Error} returns an error if the data is not of specified type
   * @memberof validateRule
   */
  validateDataType(data) {
    if (typeof data !== 'string' && typeof data !== 'object') {
      throw new BadRequestError(`data should be a string, array or object.`);
    }
  }

  /**
   * @method
   * @description validate incoming request body
   *
   * @memberof ValidateRule
   */
  validateRule() {
    this.required(this.body, ['rule', 'data']);
    this.isJSONObject(this.rule, 'rule');
    this.validateRuleFields(this.rule);
    this.checkNestingLevel(this.rule.field);
    this.validateRuleCondition(this.rule.condition);
    this.validateDataType(this.data);
    this.checkIfRuleFieldExists(this.rule.field, this.data);
  }
}

module.exports = ValidateReqBody;
