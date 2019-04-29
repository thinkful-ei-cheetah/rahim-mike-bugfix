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

app.get('/cipher', (req, res) => {
  let { text, shift } = req.query;
  //split text into array.
  const newText = text
    .toUpperCase()
    .split('')
    .map(
      letter => Number.parseInt(letter.charCodeAt(0)) + Number.parseInt(shift)
    )
    .map(code => {
      console.log(code);
      if (code > 90) {
        return code - 26;
      } else {
        return code;
      }
    })
    .map(code => String.fromCharCode(code));

  res.send(newText);
});

app.get('/lotto', (req, res) => {
  let { numbers } = req.query;

  const randomNum = numbers
    .map(num => parseInt(num))
    .filter(num => num >= 1 && num <= 20);

  if (!randomNum) {
    res.send('Please only use number between 1 and 20');
  }
  let winningNumbers = [];

  for (let i = 1; i <= 6; i++) {
    winningNumbers.push(Math.floor(Math.random() * 21));
  }

  let matchingNumber = 0;

  for (let i = 0; i < winningNumbers.length; i++) {
    for (let j = 0; j < randomNum.length; j++) {
      if (winningNumbers[i] === randomNum[j]) {
        matchingNumber++;
      }
    }
  }
  let responseText;
  switch (matchingNumber) {
    case 4:
      responseText = 'Congratulations, you win a free ticket';
      break;
    case 5:
      responseText = 'Congratulations! You win $100!';
      break;
    case 6:
      responseText = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    default:
      responseText = 'Sorry you lose';
  }

  res.send(responseText);
});

app.listen(8000, () => {
  console.log('Server is running');
});
