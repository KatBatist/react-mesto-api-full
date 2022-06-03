const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const helmet = require('helmet');

const cors = require('cors');

const { errors } = require('celebrate');

const { validateCreateUser, validateLogin } = require('./middlewares/validate');
const err = require('./middlewares/err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;

const app = express();

const allowedCors = [
  'https://domainbatist.students.nomoredomains.xyz',
  'https://api.domainbatist.students.nomoredomains.xyz',
  'http://localhost:3000',
];

app.use(cors({
  origin: allowedCors,
}));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов с вашего IP, попробуйте повторить попытку позже',
});

app.use(requestLogger);
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/', usersRoutes);
app.use('/', cardsRoutes);
app.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use(err);

app.listen(PORT);
