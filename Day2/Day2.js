const fs = require('fs');

const myArgs = process.argv.slice(2, 3);
console.log('My args:', myArgs);
let input = [];
const ex1 = [1, 0, 0, 0, 99];
const ex2 = [2, 4, 4, 5, 99, 0];
const ex3 = [1, 1, 1, 4, 99, 5, 6, 0, 99];

fs.readFile('./input', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  input = data.split(',').map(x => parseInt(x));
  // console.log(runOps(ex1));
  input[1] = 12;
  input[2] = 2;
  console.log(runOps(input)[0]);
});

function runOps(i) {
  const array = i;
  for (let x = 0; x < array.length; x += 4) {
    const op = array[x];
    const arg1 = array[x + 1];
    const arg2 = array[x + 2];
    const pos = array[x + 3];
    if (op === 99) {
      break;
    } else if (op === 1) {
      const sum = array[arg1] + array[arg2];
      array[pos] = sum;
    } else if (op === 2) {
      const prod = array[arg1] * array[arg2];
      array[pos] = prod;
    }
  }
  return array;
}
