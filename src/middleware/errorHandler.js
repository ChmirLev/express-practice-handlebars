module.exports = (err, req, res, next) => {
  console.error(err);

  res.status(500).render('auth/login', {
    title: 'Ошибка',
    error: 'Внутренняя ошибка сервера',
  });
};
