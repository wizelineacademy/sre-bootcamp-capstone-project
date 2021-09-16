const healthController = require('../controllers/healthController')
const authController = require('../controllers/authController');
const maskController = require('../controllers/maskController');
const authMiddleware = require('../middlewares/authMiddleware');
const getMaskValidator = require('../validators/getMaskValidator');

exports.init = (app) => {
  app.post('/login', authController.postLogin);
  app.get('/_health', healthController.getHealth);
  app.get('/cidr-to-mask', authMiddleware, getMaskValidator, maskController.getCidrToMask);
  app.get('/mask-to-cidr', authMiddleware, getMaskValidator, maskController.getMaskToCidr);
};
