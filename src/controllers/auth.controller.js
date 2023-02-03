const AuthServices = require('../services/auth.services');

const register = async (req, res) => {
  try {
    const user = req.body;
    const result = await AuthServices.register(user);
    
    if (result) {
      res.status(201).json({ message: 'user created' });
    } else {
      console.log('error');
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'missing data',
        message: 'not email provided',
      });
    }
    if (!password) {
      return res.status(400).json({
        error: 'missing data',
        message: 'not password provided',
      });
    }

    const result = await AuthServices.login({ email, password });

    if (result.isValid) {
      const { username, id, email } = result.user;
      const userData = { username, id, email };
      const token = AuthServices.genToken(userData);
      res.json({ id, username, email, token });
      userData.user.token = token;
    } else {
      res.status(400).json('user not found');
    }

  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  register,
  login,
}; 
