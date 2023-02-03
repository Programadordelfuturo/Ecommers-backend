const authRoutes = require('./auth.routes');
const productsRoutes = require('./products.routes');

const routerApi = (app) => {
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/products', productsRoutes);
};

module.exports = routerApi;
