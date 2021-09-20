const { describe, it } = require('mocha');
const sinon = require('sinon');

const homeController = require('../../controllers/homeController');
const healthController = require('../../controllers/healthController');
const authController = require('../../controllers/authController');
const authMiddleware = require('../../middlewares/authMiddleware');
const maskValidator = require('../../validators/maskValidator');
const cidrValidator = require('../../validators/cidrValidator');
const maskController = require('../../controllers/maskController');
const cidrController = require('../../controllers/cidrController');

const routes = require('../../routes/routes');

describe('routs.init', function () {
  it('should load all the expected routes', function () {
    const app = {
      get: function () { },
      post: function () { }
    };
    const appMock = sinon.mock(app);
    
    appMock.expects('get').once().withArgs('/', homeController.getHome);
    appMock.expects('get').once().withArgs(
      '/_health',
      healthController.getHealth
    );
    appMock.expects('post').once().withArgs('/login', authController.postLogin);
    appMock.expects('get').once()
      .withArgs(
        '/mask/:cidr',
        authMiddleware,
        cidrValidator,
        maskController.getMask
    );
    appMock.expects('get').once()
      .withArgs(
        '/cidr/:mask',
        authMiddleware,
        maskValidator,
        cidrController.getCidr
    );
    routes.init(app);
    appMock.restore();
  });
});
