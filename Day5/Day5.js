const fs = require('fs');

fs.readFile('./input', 'utf8', (err, data) => {
  if (err) {
    throw err;
  } else {
    // console.log('Hey', data.split(',')[225]);
    const cleanData = data.split(',').map(e => parseInt(e));
    runOps(cleanData);
  }
});

function runOps(arr) {
  let counter = 0;
  for (let i = 0; i < arr.length; ) {
    counter += 1;
    // console.log(counter, arr);
    const instr = `${arr[i]}`;

    const opcode = parseInt(instr.slice(-2));
    // console.log('op:', opcode, i);
    const modes = instr
      .slice(0, -2)
      .split('')
      .reverse()
      .map(e => parseInt(e));
    while (modes.length < 3) {
      modes.push(0);
    }
    if (opcode === 99) {
      return;
    }
    if (opcode === 1) {
      const arg1 = arr[modes[0] ? i + 1 : arr[i + 1]];
      const arg2 = arr[modes[1] ? i + 2 : arr[i + 2]];
      const dest = modes[2] ? i + 3 : arr[i + 3];
      arr[dest] = arg1 + arg2;
      i += 4;
    } else if (opcode === 2) {
      const arg1 = arr[modes[0] ? i + 1 : arr[i + 1]];
      const arg2 = arr[modes[1] ? i + 2 : arr[i + 2]];
      const dest = modes[2] ? i + 3 : arr[i + 3];
      arr[dest] = arg1 * arg2;
      i += 4;
    } else if (opcode === 3) {
      const dest = modes[0] ? i + 1 : arr[i + 1];
      arr[dest] = 5;
      i += 2;
    } else if (opcode === 4) {
      const dest = modes[0] ? i + 1 : arr[i + 1];
      console.log(arr[dest]);
      i += 2;
    } else if (opcode === 5) {
      const arg1 = arr[modes[0] ? i + 1 : arr[i + 1]];
      const arg2 = arr[modes[1] ? i + 2 : arr[i + 2]];
      if (arg1 !== 0) {
        i = arg2;
      } else {
        i += 3;
      }
    } else if (opcode === 6) {
      const arg1 = arr[modes[0] ? i + 1 : arr[i + 1]];
      const arg2 = arr[modes[1] ? i + 2 : arr[i + 2]];
      if (arg1 === 0) {
        i = arg2;
      } else {
        i += 3;
      }
    } else if (opcode === 7) {
      const arg1 = arr[modes[0] ? i + 1 : arr[i + 1]];
      const arg2 = arr[modes[1] ? i + 2 : arr[i + 2]];
      const dest = modes[2] ? i + 3 : arr[i + 3];
      if (arg1 < arg2) {
        arr[dest] = 1;
      } else {
        arr[dest] = 0;
      }
      i += 4;
    } else if (opcode === 8) {
      const arg1 = arr[modes[0] ? i + 1 : arr[i + 1]];
      const arg2 = arr[modes[1] ? i + 2 : arr[i + 2]];
      const dest = modes[2] ? i + 3 : arr[i + 3];
      if (arg1 === arg2) {
        arr[dest] = 1;
      } else {
        arr[dest] = 0;
      }
      i += 4;
    } else {
      console.error('Encountered a non-valid opcode!');
      return;
    }
  }
}

// runOps('3,9,8,9,10,9,4,9,99,-1,8'.split(',').map(e => parseInt(e)));
