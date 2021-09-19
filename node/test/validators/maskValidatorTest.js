const { describe, it } = require('mocha');
const sinon = require('sinon');

const maskValidator = require('../../validators/maskValidator');

describe('maskValidator', function () {
  it("it should return validation error if mask isn't in params", function () {
    const req = { params: {} };
    const res = {
      send: function () {}
    };
    const resMock = sinon.mock(res);
    resMock.expects('send').once().withArgs(422, { mask: 'mask is required'});
    maskValidator(req, res, null);
    resMock.restore();
  });

  it("it should return validation error if mask isn't valid", function () {
    const req = { params: {
      mask: '255.0.0.255'
    } };
    const res = {
      send: function () {}
    };
    const resMock = sinon.mock(res);
    resMock.expects('send').once().withArgs(422, {
      mask: 'provided value is not a valid subnet mask'
    });
    maskValidator(req, res, null);
    resMock.restore();
  });

  it("valid mask should pass validator", function () {
    const req = { params: {
      mask: '255.255.255.255'
    }};
    const next = {
      next: function () {}
    };
    const res = null;
    const nextMock = sinon.mock(next);
    nextMock.expects('next').once().withArgs();
    maskValidator(req, res, next.next);
    nextMock.restore();
  });
});
