exports.index = (req, res) => {
  res.render('dashboard', {
    title: 'Личный кабинет',
    user: req.session.user,
  });
};
