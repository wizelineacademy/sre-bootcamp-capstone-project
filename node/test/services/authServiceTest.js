const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const User = require('../../models/user');
const authService = require('../../services/authService');
const jwt = require('jsonwebtoken');

describe('authService.login', function () {
  it('should return false if user was not found', function (done) {
    const username = 'username';
    const password = 'password';
    const userFindOneStub = sinon.stub(User, 'findOne').callsFake(function () {
      return false;
    });
    authService.login(username, password)
      .then(result => {
        expect(result).to.false;
        userFindOneStub.restore();
        done();
      })
      .catch(done);
  });

  it('should return false if it fails to verify token', function (done) {
    const username = 'username';
    const password = 'invalid_password';
    const userFindOneStub = sinon.stub(User, 'findOne').callsFake(function () {
      return {
        salt: 'salt',
        password: 'password'
      };
    });
    authService.login(username, password)
      .then(result => {
        expect(result).to.be.false;
        userFindOneStub.restore();
        done();
      })
      .catch(done);
  });

  it('should return a token if the credentails are valid', function (done) {
    const username = 'admin';
    const password = 'secret';
    const userFindOneStub = sinon.stub(User, 'findOne').callsFake(function () {
      return {
        salt: 'F^S%QljSfV',
        password: (
          '15e24a16abfc4eef5faeb806e903f78b188c30e4984a03be4c243312f198d122' +
          '9ae8759e98993464cf713e3683e891fb3f04fbda9cc40f20a07a58ff4bb00788'
        ),
        role: 'admin'
      };
    });
    const token = (
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW' +
      'RtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI'
    );
    const jwtSignStub = sinon.stub(jwt, 'sign').callsFake(function () {
      return token
    });
    authService.login(username, password)
      .then(result => {
        expect(result).to.equal(token);
        userFindOneStub.restore();
        jwtSignStub.restore();
        done();
      })
      .catch(done);
  });
});

describe('authService.verifyToken', function () {
  it('should return false if jwt.verify throws error', function () {
    expect(authService.verifyToken('invalid-token')).to.be.false;
  });

  it('should return true if credentials are valid', function () {
    const jwtVerifyStub = sinon.stub(jwt, 'verify').callsFake(function () {
      return true;
    });
    expect(authService.verifyToken('a-valid-token')).to.be.true;
    jwtVerifyStub.restore()
  });
});
