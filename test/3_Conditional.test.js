'use strict';
/* global it */
/* global describe */
/* eslint no-unused-vars:0 */
/* eslint no-unused-expressions:0 */

const chai = require('chai');
const should = chai.should(); // eslint-disable-line

const {
  Condition,
  Case,
  Conditional
} = require('./../app');

const wrapForThrowing = (fn, ...params) => {
  return () => {
    fn(...params);
  };
};

describe('Conditonal', () => {
  describe('#constructor', () => {
    it('should throw if invalid parameters are supplied', done => {
      wrapForThrowing(() => {
        const conditonal = new Conditional([]);
      }).should.throw();

      wrapForThrowing(() => {
        const conditonal = new Conditional('asdf');
      });

      done();
    });

    it('should not throw if valid parameters are supplied', done => {
      wrapForThrowing(() => {
        const conditonal = new Conditional(
          [new Case([
            new Condition('>', 5)
          ], 5)]
        );
      }).should.not.throw();

      done();
    });
  });

  describe('#getFittingCases', () => {
    const conditional = new Conditional([
      new Case([new Condition('>', 5)], 'foo'),
      new Case([new Condition('>', 10)], 'bar')
    ]);

    describe('second parameter false', () => {
      it('should return only the first value', done => {
        conditional.getFittingCases(15).should.be.equal('foo');
        done();
      });

      it('should return null if no fitting case was found', done => {
        should.equal(conditional.getFittingCases(5), null);
        done();
      });
    });

    describe('second parameter true', () => {
      it('should return all values', done => {
        conditional.getFittingCases(15, true).should.be.deep.equal(['foo', 'bar']);
        done();
      });

      it('should return null if no fitting case was found', done => {
        should.equal(conditional.getFittingCases(5, true), null);
        done();
      });
    });
  });
});
