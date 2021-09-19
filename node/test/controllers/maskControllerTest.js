const { describe, it } = require('mocha');
const sinon = require('sinon');

const maskService = require('../../services/maskService');
const maskController = require('../../controllers/maskController');

describe('maskController.getMask', function () {
  it('should return correct maskToCidr format', function () {
    const req = {
      params: { cidr: 32 }
    }
    const res = {
      send: function () { }
    }
    const resMock = sinon.mock(res);
    resMock.expects('send').once().withArgs({
      function: 'cidrToMask',
      input: req.params.cidr,
      output: '255.255.255.255'
    });
    const maskServiceCidrToMaskStub = sinon.stub(
      maskService,
      'cidrToMask'
    ).callsFake(function () {
      return '255.255.255.255';
    });
    maskController.getMask(req, res);
    sinon.assert.calledWith(maskServiceCidrToMaskStub, req.params.cidr)
    resMock.verify();
    maskServiceCidrToMaskStub.restore();
  });
});
