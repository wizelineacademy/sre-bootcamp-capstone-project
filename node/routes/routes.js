const healthController = require('../controllers/healthController')
const authController = require('../controllers/authController');
const maskController = require('../controllers/maskController');
const cidrController = require('../controllers/cidrController');
const authMiddleware = require('../middlewares/authMiddleware');
const cidrValidator = require('../validators/cidrValidator');
const maskValidator = require('../validators/maskValidator');

exports.init = (app) => {
  app.post('/login', authController.postLogin);
  app.get('/_health', healthController.getHealth);
  app.get('/mask/:cidr', authMiddleware, cidrValidator, maskController.getMask);
  app.get('/cidr/:mask', authMiddleware, maskValidator, cidrController.getCidr);
};
