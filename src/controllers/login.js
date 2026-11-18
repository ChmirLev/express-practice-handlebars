const loginService = require('../services/login.js');

exports.loginPage = (req, res) => {
  if (req.session.user) return res.redirect('/');

  res.render('login', {
    title: 'Вход',
    error: null,
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.authenticate({ email, password });

    req.session.regenerate((err) => {
      if (err) return next(err);

      req.session.user = {
        id: user.id,
        email: user.email,
      };

      res.redirect('/');
    });
  } catch (err) {
    res.status(401).render('/login', {
      title: 'Вход',
      error: 'Неверный email или пароль',
    });
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect('/login');
  });
};
