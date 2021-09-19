const { describe, it } = require('mocha');
const sinon = require('sinon');

const cidrService = require('../../services/cidrService');
const cidrController = require('../../controllers/cidrController');

describe('cidrController.getCidr', function () {
  it('should return correct maskToCidr format', function () {
    const req = {
      params: { mask: '255.255.255.255' }
    }
    const res = {
      send: function () { }
    }
    const resMock = sinon.mock(res);
    resMock.expects('send').once().withArgs({
      function: 'maskToCidr',
      input: req.params.mask,
      output: 32
    });
    const cidrServiceMaskToCidrStub = sinon.stub(
      cidrService,
      'maskToCidr'
    ).callsFake(function () {
      return 32;
    });
    cidrController.getCidr(req, res);
    sinon.assert.calledWith(cidrServiceMaskToCidrStub, req.params.mask)
    resMock.verify();
    cidrServiceMaskToCidrStub.restore();
  });
});
