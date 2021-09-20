const { describe, it } = require('mocha');
const sinon = require('sinon');

const homeController = require('../../controllers/homeController');

describe('homeController.getHome', function () {
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
    homeController.getHome(null, res, next.next)
    resMock.verify();
    nextMock.verify();
    resMock.restore();
    nextMock.restore();
  });
});
