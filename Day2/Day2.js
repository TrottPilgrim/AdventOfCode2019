// Find the noun and the verb by running `node Day2 answer`
// Puzzle answer for part 1 was 2894520
const fs = require('fs');

let input = [];
const ex1 = [1, 0, 0, 0, 99];
const ex2 = [2, 4, 4, 5, 99, 0];
const ex3 = [1, 1, 1, 4, 99, 5, 6, 0, 99];

fs.readFile('./input', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  input = data.split(',').map(x => parseInt(x));
  const arg = process.argv.slice(2, 3)[0];
  let nv;
  if (!isNaN(arg)) {
    nv = replaceAndRun(input, parseInt(arg));
  } else {
    console.log(`No answer provided, defaulting arg to 19690720`);
    nv = replaceAndRun(input, 19690720);
  }

  console.log('Answer is:', 100 * nv[0] + nv[1]);
});

/* 
Returns an array that represents executed memory of an intcode machine, with an answer at address 0
 */
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

function replaceAndRun(arr, arg) {
  let temp;
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      temp = [...arr];
      temp[1] = x;
      temp[2] = y;
      // console.log(runOps(temp).slice(0, 4));

      const ans = runOps(temp)[0];
      if (ans === arg) {
        console.log(x, y);
        return [x, y];
      }
    }
  }
}
