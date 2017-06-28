'use strict';
/* global it */
/* global describe */
/* eslint no-unused-vars:0 */
/* eslint no-unused-expressions:0 */

const chai = require('chai');
const should = chai.should(); // eslint-disable-line

const {
  Condition,
  Case
} = require('./../app');

const wrapForThrowing = (fn, ...params) => {
  return () => {
    fn(...params);
  };
};

describe('Case', () => {
  describe('#constructor', () => {
    it('should throw when something different from an array is supplied', done => {
      wrapForThrowing(() => {
        const case1 = new Case('asdf');
      }).should.throw();

      done();
    });

    it('should throw when an empty array is supplied', done => {
      wrapForThrowing(() => {
        const case1 = new Case([]);
      }).should.throw();

      done();
    });

    it('should throw when an invalid object is supplied', done => {
      wrapForThrowing(() => {
        const case1 = new Case([{
          operator: 'asdf',
          value: 15
        }]);
      }).should.throw();

      wrapForThrowing(() => {
        const case1 = new Case([{
          operator: '>',
          value: 'sadf'
        }]);
      }).should.throw();

      done();
    });

    it('should not throw when a valid object is supplied', done => {
      wrapForThrowing(() => {
        const case1 = new Case([{
          operator: '>',
          value: 15
        }]);
      }).should.not.throw();

      wrapForThrowing(() => {
        const case1 = new Case([{
          operator: '=',
          value: 14.81273817238
        }]);
      }).should.not.throw();

      wrapForThrowing(() => {
        const case1 = new Case([
          new Condition('<', 5)
        ]);
      });

      done();
    });
  });

  describe('#areConditionsTrue', () => {
    describe('with one condition', () => {
      const conditions = [
        new Condition('>=', 10)
      ];

      const case1 = new Case(conditions, []);

      it('should return true if the condition is true', done => {
        case1.areConditionsTrue(10).should.be.true;
        case1.areConditionsTrue(15).should.be.true;

        done();
      });

      it('should return false if the condition is false', done => {
        case1.areConditionsTrue(0).should.be.false;
        case1.areConditionsTrue('5').should.be.false;

        done();
      });
    });

    describe('with multiple conditions', () => {
      const conditions = [
        new Condition('>=', 10),
        new Condition('<', 20)
      ];

      const case1 = new Case(conditions, []);

      it('should return true if all conditions are true', done => {
        case1.areConditionsTrue(10).should.be.true;
        case1.areConditionsTrue(19).should.be.true;

        done();
      });

      it('should return false if any conditions are false', done => {
        case1.areConditionsTrue(9).should.be.false;
        case1.areConditionsTrue(21).should.be.false;

        done();
      });
    });
  });

  describe('#getValue', () => {
    const condition = [
      new Condition('>', 20)
    ];

    it('should correctly return arrays', done => {
      (new Case(condition, [])).getValue().should.be.deep.equal([]);

      done();
    });

    it('should correctly return numbers', done => {
      (new Case(condition, 5)).getValue().should.be.equal(5);

      done();
    });

    it('should correctly return strings', done => {
      (new Case(condition, 'string')).getValue().should.be.equal('string');

      done();
    });

    it('should correctly return functions', done => {
      const method = () => {};
      (new Case(condition, method)).getValue().should.be.equal(method);

      done();
    });
  });
});
