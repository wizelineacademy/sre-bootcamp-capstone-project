const { describe, it } = require('mocha');
const sinon = require('sinon');

const cidrValidator = require('../../validators/cidrValidator');

describe('cidrValidator', function () {
  it('missing cidr param should return validation error', function () {
    const req = { params: {} };
    const res = {
      send: function () {}
    };
    const resMock = sinon.mock(res);
    resMock.expects('send').once().withArgs(422, { cidr: 'cidr is required' });
    cidrValidator(req, res, null);
    resMock.restore();
  });

  it('invalid cidr should return validation error', function () {
    const req = { params: { cidr: 33 } };
    const res = {
      send: function () {}
    };
    const resMock = sinon.mock(res);
    resMock.expects('send').once().withArgs(422, {
      cidr: 'cidr must be a numeric value between 1 and 32'
    });
    cidrValidator(req, res, null);
    resMock.restore();
  });

  it('valid cidr should pass validation', function () {
    const req = { params: { cidr: 32 } };
    const next = {
      next: function () {}
    }
    const res = null;
    const nextMock = sinon.mock(next);
    nextMock.expects('next').once().withArgs();
    cidrValidator(req, res, next.next);
    nextMock.restore();
  });
});
