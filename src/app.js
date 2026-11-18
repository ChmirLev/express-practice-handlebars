const path = require('path');
const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');

const app = express();

const users = [];


app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
  })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));


app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
  })
);


app.get('/', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  res.render('home', {
    title: 'Главная страница',
    user: req.session.user,
  });
});


app.get('/registration', (req, res) => {
  res.render('registration', {
    title: 'Регистрация',
    error: null,
  });
});


app.post('/registration', (req, res) => {
  const { username, email, password, passConf } = req.body;

  if (!username || !email || !password || !passConf) {
    return res.render('registration', {
      title: 'Регистрация',
      error: 'Заполните все поля.',
    });
  }

  if (password !== passConf) {
    return res.render('registration', {
      title: 'Регистрация',
      error: 'Пароли не совпадают.',
    });
  }

  const userExists = users.some(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (userExists) {
    return res.render('registration', {
      title: 'Регистрация',
      error: 'Пользователь с таким email уже существует.',
    });
  }

  users.push({
    username,
    email: email.toLowerCase(),
    password,
  });

  res.redirect('/login');
});


app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Вход',
    error: null,
  });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return res.render('login', {
      title: 'Вход',
      error: 'Неверный email или пароль.',
    });
  }

  req.session.user = {
    username: user.username,
    email: user.email,
  };

  res.redirect('/');
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = app;
