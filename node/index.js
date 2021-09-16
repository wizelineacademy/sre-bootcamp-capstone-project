const Config = require('./config/default');
const app = require('./server');

app.listen(Config.port, function () {
  console.log('listening at', Config.port);
});
