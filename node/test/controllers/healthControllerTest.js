const { describe, it } = require('mocha');
const sinon = require('sinon');

const healthController = require('../../controllers/healthController');

describe('healthController.getHealth', function () {
  it('should return OK if called', function () {
    const res = {
      send: function () { }
    };
    const next = {
      next: function () {}
    };
    const resMock = sinon.mock(res);
    const nextMock = sinon.mock(next);
    resMock.expects('send').once().withArgs("OK");
    nextMock.expects("next").once().withArgs();
    healthController.getHealth(null, res, next.next)
    resMock.verify();
    nextMock.verify();
    resMock.restore();
    nextMock.restore();
  });
});
