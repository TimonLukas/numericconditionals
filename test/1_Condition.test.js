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

describe('Condition', () => {
  describe('#constructor', () => {
    it('should not throw with correct inputs', done => {
      wrapForThrowing(() => {
        const condition1 = new Condition('>', 20);
        const condition2 = new Condition('<', 50);
        const condition3 = new Condition('>=', -20);
      }).should.not.throw();

      done();
    });

    it('should throw with incorrect inputs', done => {
      wrapForThrowing(() => {
        const condition1 = new Condition('asdf', 20);
      }).should.throw();

      wrapForThrowing(() => {
        const condition2 = new Condition('<', 'asdf');
      }).should.throw();

      done();
    });

    it('should work with numeric and string inputs alike', done => {
      const condition1 = new Condition('<', 15);
      const condition2 = new Condition('<', '15');

      (condition1.value === condition2.value).should.be.true;

      done();
    });
  });

  describe('#isTrue', () => {
    describe('operator <', () => {
      const condition1 = new Condition('<', 15);

      it('should return true if the condition is true', done => {
        condition1.isTrue(10).should.be.true;
        condition1.isTrue(14.999).should.be.true;

        done();
      });

      it('should return false if the condition is false', done => {
        condition1.isTrue(20).should.be.false;
        condition1.isTrue(15).should.be.false;

        done();
      });
    });

    describe('operator <=', () => {
      const condition1 = new Condition('<=', 15);

      it('should return true if the condition is true', done => {
        condition1.isTrue(10).should.be.true;
        condition1.isTrue(15).should.be.true;

        done();
      });

      it('should return false if the condition is false', done => {
        condition1.isTrue(20).should.be.false;
        condition1.isTrue(15.1111).should.be.false;

        done();
      });
    });

    describe('operator >', () => {
      const condition1 = new Condition('>', 15);

      it('should return true if the condition is true', done => {
        condition1.isTrue(20).should.be.true;
        condition1.isTrue(15.11).should.be.true;

        done();
      });

      it('should return false if the condition is false', done => {
        condition1.isTrue(10).should.be.false;
        condition1.isTrue(15).should.be.false;

        done();
      });
    });

    describe('operator >=', () => {
      const condition1 = new Condition('>=', 15);

      it('should return true if the condition is true', done => {
        condition1.isTrue(20).should.be.true;
        condition1.isTrue(15).should.be.true;

        done();
      });

      it('should return false if the condition is false', done => {
        condition1.isTrue(10).should.be.false;
        condition1.isTrue(14.999).should.be.false;

        done();
      });
    });

    describe('operator =', () => {
      const condition1 = new Condition('=', 15);

      it('should return true if the condition is true', done => {
        condition1.isTrue(15).should.be.true;

        done();
      });

      it('should return false if the condition is false', done => {
        condition1.isTrue(14).should.be.false;
        condition1.isTrue(16).should.be.false;

        done();
      });
    });
  });
});
