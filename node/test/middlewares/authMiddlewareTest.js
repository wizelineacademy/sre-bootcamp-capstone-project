const { describe, it } = require('mocha');
const sinon = require('sinon');

const authService = require('../../services/authService');
const authMiddleware = require('../../middlewares/authMiddleware');

describe('authMiddleware', function () {
  it('invalid authorization header format should return unauthorized',
    function () {
      const req = {
        headers: {
          authorization: 'invalid token'
        }
      };
      const res = {
        send: function () { }
      };
      const resMock = sinon.mock(res);
      resMock.expects('send').once().withArgs(
        401,
        { message: 'UNAUTHORIZED' }
      );
      authMiddleware(req, res, null);
      resMock.restore();
    }
  );

  it('missing authorizawtion header should return false',
    function () {
      const req = {
        headers: {}
      };
      const res = {
        send: function () { }
      };
      const resMock = sinon.mock(res);
      resMock.expects('send').once().withArgs(
        401,
        { message: 'UNAUTHORIZED' }
      );
      authMiddleware(req, res, null);
      resMock.restore();
    }
  );

  it('if token is invalid should not pass',
    function () {
      const req = {
        headers: {
          authorization: 'Bearer an-invalid-token'
        }
      };
      const res = {
        send: function () { }
      };
      const resMock = sinon.mock(res);
      resMock.expects('send').once().withArgs(
        401,
        { message: 'UNAUTHORIZED' }
      );
      const authServiceStub = sinon.stub(authService, 'verifyToken')
        .callsFake(function () {
          return false;
        });
      authMiddleware(req, res, null);
      resMock.restore();
      authServiceStub.restore();
    }
  );

  it('if token is valid, it should pass',
    function () {
      const req = {
        headers: {
          authorization: 'Bearer a-valid-token'
        }
      };
      const res = null;
      const next = {
        next: function () { }
      }
      const nextMock = sinon.mock(next);
      nextMock.expects('next').once().withArgs();
      const authServiceStub = sinon.stub(authService, 'verifyToken')
        .callsFake(function () {
          return true;
        });
      authMiddleware(req, res, next.next);
      nextMock.verify();
      nextMock.restore();
      authServiceStub.restore();
    }
  );
});
