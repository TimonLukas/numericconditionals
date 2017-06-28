const isNumber = require('is-number');

module.exports = class Condition {
  /**
   * Creates a new condition
   * @param {string} operator The operator which should be used
   * @param value The value against which should be compared
   */
  constructor (operator, value) {
    switch (operator) {
      case '>':
      case '>=':
      case '<':
      case '<=':
      case '=':
        if (!isNumber(value)) {
          throw new Error('value must be numeric!');
        }
        this.operator = operator;
        this.value = Number(value);
        break;
      default:
        throw new Error('Invalid operator supplied');
    }
  }

  /**
   * Computes whether the condition is fulfilled for the parameters
   * @param value The parameter against which should be compared
   * @returns {boolean} Whether the condition fits
   */
  isTrue (value) {
    switch (this.operator) {
      case '>':
        return value > this.value;
      case '>=':
        return value >= this.value;
      case '<':
        return value < this.value;
      case '<=':
        return value <= this.value;
      case '=':
        return Number(value) === this.value;
    }

    return false;
  }
};
