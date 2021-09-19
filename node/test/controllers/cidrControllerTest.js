const { describe, it } = require('mocha');
const sinon = require('sinon');

const cidrService = require('../../services/cidrService');
const cidrController = require('../../controllers/cidrController');

describe('cidrController.getCidr', function () {
  it('should return correct mastToCidr format', function () {
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
    const cidrServiceMastToCidrStub = sinon.stub(
      cidrService,
      'maskToCidr'
    ).callsFake(function () {
      return 32;
    });
    cidrController.getCidr(req, res);
    sinon.assert.calledWith(cidrServiceMastToCidrStub, req.params.mask)
    resMock.verify();
    cidrServiceMastToCidrStub.restore();
  });
});
