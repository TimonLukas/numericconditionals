const ajv = new (require('ajv'))();
const schema = {
  'properties': {
    'operator': {
      type: 'string',
      pattern: '<|>|<=|>=|='
    },
    'value': {
      type: 'number'
    }
  }
};

const validate = ajv.compile(schema);

const Condition = require('./Condition');

module.exports = class Case {
  /**
   * Creates a new case
   * @param {Array.<Condition>|Array.<Object>} conditions Either array of conditions or array of objects with valid schema
   * @param value
   */
  constructor (conditions, value) {
    if (!Array.isArray(conditions)) {
      throw new Error('conditions must be an array.');
    }

    if (conditions.length === 0) {
      throw new Error('There must be at least one condition!');
    }

    conditions.map(condition => {
      if (!validate(condition)) {
        throw validate.errors;
      }

      if (!(condition instanceof Condition)) {
        return new Condition(condition.operator, condition.value);
      }

      return condition;
    });

    this.conditions = conditions;
    this.value = value;
  }

  /**
   * Are all conditions met?
   * @param value The value against which should be compared
   * @returns {boolean} Whether all conditions are met or nor
   */
  areConditionsTrue (value) {
    return this.conditions.filter(condition => {
      return !condition.isTrue(value);
    }).length === 0;
  }

  /**
   * @returns {*} The value which was supplied in the parameter
   */
  getValue () {
    return this.value;
  }
};
