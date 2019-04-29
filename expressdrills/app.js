'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/sum', (req, res) => {
  let { a, b } = req.query;

  a = Number.parseInt(a);
  b = Number.parseInt(b);

  const c = a + b;
  // if (a) {
  //   return res.send(a);
  // }

  const resResult = `The sum of ${a} and ${b} is ${c}`;
  res.send(resResult);
});

app.listen(8000, () => {
  console.log('Server is running');
});
