module.exports = class Conditional {
  /**
   * Creates a new conditional from existing cases
   * @param {Array.<Case>} cases The cases which should be compared against
   */
  constructor (cases) {
    if (!Array.isArray(cases)) {
      throw new Error('cases must be an array.');
    }

    if (cases.length === 0) {
      throw new Error('There must be at least one case!');
    }

    this.cases = cases;
  }

  /**
   *
   * @param value The value against which should be compared
   * @param {boolean} returnAll Should all fitting case values be returned?
   * @returns {null|*} The value of the first fitting case/all fitting cases, null if non fit
   */
  getFittingCases (value, returnAll = false) {
    const fittingCases = this.cases.filter(conditionCase => {
      return conditionCase.areConditionsTrue(value);
    });

    if (fittingCases.length === 0) {
      return null;
    }

    if (returnAll) {
      return fittingCases.map(fittingCase => {
        return fittingCase.getValue();
      });
    }

    return fittingCases[0].getValue();
  }
};