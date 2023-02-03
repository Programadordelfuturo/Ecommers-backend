const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.startsWith('Bearer')) {
    const token = authorization.splice(7);
    req.token = token;
  }
  next();
};

module.exports = tokenExtractor;
