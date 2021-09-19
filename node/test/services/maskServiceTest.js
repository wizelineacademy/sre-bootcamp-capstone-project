const { describe, it } = require('mocha');
const { expect } = require('chai');
const maskService = require('../../services/maskService');

describe('maskService.isValidMask', function () {
  it('should return true if mask is valid', function () {
    expect(maskService.isValidMask('255.255.255.0')).to.be.true;
  });

  it('should return true if mask is 255.255.255.248', function () {
    expect(maskService.isValidMask('255.255.255.0')).to.be.true;
  });

  it('should return false if separators are not dots', function () {
    expect(maskService.isValidMask('255x255x255x0')).to.be.false;
  });

  it('should return false if mask is invalid', function () {
    expect(maskService.isValidMask('255.0.255.0')).to.be.false;
  });

  it('should return false if mask is 0.0.0.0', function () {
    expect(maskService.isValidMask('0.0.0.0')).to.be.false;
  });

  it("should return false if mast doesn't have the ip format", function () {
    expect(maskService.isValidMask('hello world')).to.be.false;
  });
});

describe('maskService.cidrToMask', function () {
  const expectedResults = [
    [32, '255.255.255.255'],
    [31, '255.255.255.254'],
    [30, '255.255.255.252'],
    [29, '255.255.255.248'],
    [28, '255.255.255.240'],
    [27, '255.255.255.224'],
    [26, '255.255.255.192'],
    [25, '255.255.255.128'],
    [24, '255.255.255.0'],
    [23, '255.255.254.0'],
    [22, '255.255.252.0'],
    [21, '255.255.248.0'],
    [20, '255.255.240.0'],
    [19, '255.255.224.0'],
    [18, '255.255.192.0'],
    [17, '255.255.128.0'],
    [16, '255.255.0.0'],
    [15, '255.254.0.0'],
    [14, '255.252.0.0'],
    [13, '255.248.0.0'],
    [12, '255.240.0.0'],
    [11, '255.224.0.0'],
    [10, '255.192.0.0'],
    [9, '255.128.0.0'],
    [8, '255.0.0.0'],
    [7, '254.0.0.0'],
    [6, '252.0.0.0'],
    [5, '248.0.0.0'],
    [4, '240.0.0.0'],
    [3, '224.0.0.0'],
    [2, '192.0.0.0'],
    [1, '128.0.0.0'],
  ];

  for (const expectedResult of expectedResults) {
    it(
      `should should return valid mask for /${expectedResult[0]} cidr`,
      function () {
        expect(maskService.cidrToMask(expectedResult[0]))
          .to.equal(expectedResult[1]);
    });
  }

});
