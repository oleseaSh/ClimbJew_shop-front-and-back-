const express = require('express');
const parser = require('body-parser');

const appOne = express();
const appTwo = express();

// Middleware для обработки CORS для обоих серверов
appOne.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

appTwo.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Парсинг тела запроса
appOne.use(parser.json());
appTwo.use(parser.json());

// Конфигурация первого сервера
appOne.get('/', (req, res) => res.send('Server one'));
appOne.get('/get', (req, res) => res.send('Method GET, server one'));
appOne.post('/post', (req, res) => {
  if (Object.keys(req.body).length > 0) {
    res.json({
      method: 'POST',
      server: 'one',
      body: req.body
    });
  } else {
    res.json({
      method: 'POST',
      server: 'one',
      body: 'empty'
    });
  }
});
appOne.get('/auth', (req, res) => {
  if (req.headers.authorization && req.headers.authorization === 'api-key-one') {
    res.send('Auth success, server one');
  } else {
    res.status(401).send();
  }
});
appOne.listen(7000, () => {
  console.log('Server one is running on http://localhost:7000');
});

// Конфигурация второго сервера
appTwo.get('/', (req, res) => res.send('Server two'));
appTwo.get('/get', (req, res) => res.send('Method GET, server two'));
appTwo.post('/post', (req, res) => {
  if (Object.keys(req.body).length > 0) {
    res.json({
      method: 'POST',
      server: 'two',
      body: req.body
    });
  } else {
    res.json({
      method: 'POST',
      server: 'two',
      body: 'empty'
    });
  }
});
appTwo.get('/auth', (req, res) => {
  if (req.headers.authorization && req.headers.authorization === 'api-key-two') {
    res.send('Auth success, server two');
  } else {
    res.status(401).send();
  }
});
