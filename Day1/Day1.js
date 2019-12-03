const fs = require('fs');

// Fuel required to launch a given module is based on its mass.Specifically, to find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.

let data;

fs.readFile('./input.txt', 'utf8', (err, txt) => {
  if (err) {
    throw err;
  }
  data = txt.split('\n').map(x => parseInt(x, 10));
  // console.log(data);

  let totalFuel = 0;
  for (const i of data) {
    totalFuel += calculateFuel(i);
  }
  console.log(totalFuel);

  let totalFuel2 = 0;
  // const data2 = [100756];
  for (const i of data) {
    totalFuel2 += calcFuel2(i);
  }
  console.log(totalFuel2);
});

function calculateFuel(i) {
  return Math.floor(i / 3) - 2;
}

function calcFuel2(i) {
  let cumulativeFuel = calculateFuel(i);
  let j = cumulativeFuel;
  while (calculateFuel(j) > 0) {
    j = calculateFuel(j);
    cumulativeFuel += j;
  }
  return cumulativeFuel;
}
