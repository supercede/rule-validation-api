const validateData = require('../../validations/dataValidation');

describe('validate data based on conditions', () => {
  test('test equality', () => {
    const resp = validateData(23, 'eq', 24);
    expect(resp).toBe(false);
  });

  test('test inequality', () => {
    const resp = validateData(23, 'neq', 24);
    expect(resp).toBe(true);
  });

  test('test greater than', () => {
    const resp = validateData(23, 'gt', 24);
    expect(resp).toBe(false);
  });

  test('test greater than or equal to', () => {
    const resp = validateData(24, 'gte', 24);
    expect(resp).toBe(true);
  });

  test('contain', () => {
    const resp = validateData('holla', 'contains', 'la');
    expect(resp).toBe(true);
  });

  test('default', () => {
    const resp = validateData('24', 'equals', '24');
    expect(resp).toBe(false);
  });
});
