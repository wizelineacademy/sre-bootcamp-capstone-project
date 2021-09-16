const { APP } = require('./config/config')
const sequelize = require('./database/db');
const app = require('./server');

sequelize
  .authenticate()
  .then(() => {
    console.log('connected to db');
    app.listen(APP.port, function () {
      console.log('listening at', APP.port);
    });
  })
  .catch(err => console.log(err))

