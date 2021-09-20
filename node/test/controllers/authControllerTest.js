const { describe, it } = require('mocha');
const sinon = require('sinon');

const authService = require('../../services/authService');
const authController = require('../../controllers/authController');

describe('authController.postLogin', function () {
  it('it should return token if login credentials are valid', function (done) {
    const req = {
      body: {
        username: 'username',
        password: 'password'
      }
    };
    const res = {
      send: function () { }
    };
    const next = {
      next: function () { }
    };
    const token = 'a-valid-token';
    const authServiceLoginStub = sinon.stub(authService, 'login')
      .callsFake(function () {
        return token;
      });
    const resMock = sinon.mock(res);
    const nextMock = sinon.mock(next);
    resMock.expects('send').once().withArgs({ data: token });
    nextMock.expects('next').once().withArgs();

    authController.postLogin(req, res, next.next)
      .then(() => {
        resMock.verify();
        nextMock.verify();
        sinon.assert.calledWith(
          authServiceLoginStub,
          req.body.username,
          req.body.password
        );
        authServiceLoginStub.restore();
        resMock.restore();
        nextMock.restore();
        done();
      })
      .catch(done)
  });

  it('it should return false if login credentials are invalid',
    function (done) {
      const req = {
        body: {
          username: 'username',
          password: 'password'
        }
      };
      const res = {
        send: function () { }
      };
      const next = {
        next: function () { }
      };
      const authServiceLoginStub = sinon.stub(authService, 'login')
        .callsFake(function () {
          return false;
        });
      const resMock = sinon.mock(res);
      const nextMock = sinon.mock(next);
      resMock.expects('send').once().withArgs({ data: false });
      nextMock.expects('next').once().withArgs();

      authController.postLogin(req, res, next.next)
        .then(() => {
          resMock.verify();
          nextMock.verify();
          sinon.assert.calledWith(
            authServiceLoginStub,
            req.body.username,
            req.body.password
          );
          authServiceLoginStub.restore();
          resMock.restore();
          nextMock.restore();
          done();
        })
        .catch(done)
    });
});
