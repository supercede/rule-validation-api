const server = require('../setup');
const data = require('../../fixtures/data');

describe('validation route', () => {
  describe('should throw error if required fields are not passed', () => {
    test('throw error if rule is not passed', async () => {
      const response = await server
        .post('/validate-rule')
        .send(data.missingRule);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual('rule is required.');
      expect(response.body.status).toEqual('error');
    });

    test('should throw error if rule is not passed', async () => {
      const response = await server
        .post('/validate-rule')
        .send(data.missingData);

      expect(400);
      expect(response.body.message).toEqual('data is required.');
      expect(response.body.status).toEqual('error');
    });

    test('should throw error if rule is not passed', async () => {
      const response = await server
        .post('/validate-rule')
        .send(data.missingData);

      expect(400);
      expect(response.body.message).toEqual('data is required.');
      expect(response.body.status).toEqual('error');
    });

    test('should throw error if rule field is not an object', async () => {
      const response = await server
        .post('/validate-rule')
        .send(data.stringRule);

      expect(400);
      expect(response.body.message).toEqual('rule should be an object.');
      expect(response.body.status).toEqual('error');
    });

    test('should throw error if required rule field is not passed', async () => {
      const response = await server
        .post('/validate-rule')
        .send(data.missingRuleField);

      expect(400);
      expect(response.body.message).toEqual('condition_value is required.');
      expect(response.body.status).toEqual('error');
    });
  });

  describe('validate field properties', () => {
    test('should throw error if condition is invalid', async () => {
      const response = await server
        .post('/validate-rule')
        .send(data.invalidCondition);

      expect(400);
      expect(response.body.message).toEqual(
        `invalid condition: '${data.invalidCondition.rule.condition}'.`
      );
      expect(response.body.status).toEqual('error');
    });

    test('should throw error if condition is invalid', async () => {
      const response = await server
        .post('/validate-rule')
        .send(data.invalidCondition);

      expect(400);
      expect(response.body.message).toEqual(
        `invalid condition: '${data.invalidCondition.rule.condition}'.`
      );
      expect(response.body.status).toEqual('error');
    });

    test('throw error if rule is more than 2 nesting levels', async () => {
      const response = await server
        .post('/validate-rule')
        .send(data.threeLevelNesting);

      expect(400);
      expect(response.body.message).toEqual(
        `field value ${data.threeLevelNesting.rule.field} contains more than 2 levels of nesting.`
      );
      expect(response.body.status).toEqual('error');
    });
  });

  describe('validate data', () => {
    test('should validate data type', async () => {
      const response = await server
        .post('/validate-rule')
        .send(data.invalidDataType);

      expect(400);
      expect(response.body.message).toEqual(
        'data should be a string, array or object.'
      );
      expect(response.body.status).toEqual('error');
    });

    test('should throw error if field in rule is not in string data', async () => {
      const response = await server
        .post('/validate-rule')
        .send(data.fieldMissingInStringData);

      expect(400);
      expect(response.body.message).toEqual(
        `field ${data.fieldMissingInStringData.rule.field} is missing from data.`
      );
      expect(response.body.status).toEqual('error');
    });

    test('should throw error if field in rule is not in array data', async () => {
      const response = await server
        .post('/validate-rule')
        .send(data.fieldMissingInArrayData);

      expect(400);
      expect(response.body.message).toEqual(
        `field ${data.fieldMissingInArrayData.rule.field} is missing from data.`
      );
      expect(response.body.status).toEqual('error');
    });

    test('should throw error if field in rule is not in array data', async (done) => {
      const response = await server
        .post('/validate-rule')
        .send(data.fieldMissingInArrayData);

      expect(400);
      expect(response.body.message).toEqual(
        `field ${data.fieldMissingInArrayData.rule.field} is missing from data.`
      );
      expect(response.body.status).toEqual('error');

      done();
    });

    test('should throw error if field in rule is not in object data', async (done) => {
      const response = await server
        .post('/validate-rule')
        .send(data.fieldMissingInObjectData);

      expect(400);
      expect(response.body.message).toEqual(
        `field ${data.fieldMissingInObjectData.rule.field} is missing from data.`
      );
      expect(response.body.status).toEqual('error');

      done();
    });
  });

  describe('Run validation test if all fields are provided correctly', () => {
    test('should return success if data value meet rule conditions', async () => {
      const response = await server
        .post('/validate-rule')
        .send(data.validationSuccess);

      expect(200);
      expect(response.body).toEqual({
        message: 'field missions.count successfully validated.',
        status: 'success',
        data: {
          error: false,
          field: 'missions.count',
          field_value: 45,
          condition: 'gte',
          condition_value: 30,
        },
      });
    });

    test('should return success for nested data if data value meet rule conditions', async () => {
      const response = await server
        .post('/validate-rule')
        .send(data.nestedDataSuccess);

      expect(200);
      expect(response.body).toEqual({
        message: 'field missions.locations.0 successfully validated.',
        status: 'success',
        data: {
          error: false,
          field: 'missions.locations.0',
          field_value: 'abeokuta',
          condition: 'contains',
          condition_value: 'okuta',
        },
      });
    });

    test('should throw error if data value fails to meet rule conditions', async (done) => {
      const response = await server
        .post('/validate-rule')
        .send(data.validationError);

      expect(200);
      expect(response.body).toEqual({
        message: 'field 0 failed validation.',
        status: 'error',
        data: {
          error: true,
          field: '0',
          field_value: 'd',
          condition: 'eq',
          condition_value: 'a',
        },
      });

      done();
    });
  });
});
