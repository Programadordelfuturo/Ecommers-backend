const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const initModels = require('./models/initModels');
const routerApi = require('./routes/index');
const errorHandler = require('./middlewares/error.middleware');
const tokenExtractor = require('./middlewares/tokenExtractor.middleware');
const db = require('./utils/database');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

initModels(app);
app.use(tokenExtractor);
app.use(errorHandler);
routerApi(app);

db.sync({ force: false })
  .then(() => console.log('db ready'))
  .catch((error) => console.log(error));

module.exports = app;
