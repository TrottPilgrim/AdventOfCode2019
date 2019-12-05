// It is a six-digit number.
// The value is within the range given in your puzzle input.
// Two adjacent digits are the same (like 22 in 122345).
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

// This code is unworkable and bad but i finally figured it out

const checker = num => {
  let adjDigits = false;
  let prevDigit = 0;
  let decreasingDigits = false;
  `${num}`.split('').forEach(e => {
    const temp = parseInt(e);
    if (temp === prevDigit) {
      adjDigits = true;
    }
    if (temp < prevDigit) {
      decreasingDigits = true;
    }
    prevDigit = temp;
  });
  return adjDigits && !decreasingDigits;
};

const checker2 = num => {
  let addtoArr = false;
  let previousAdj = 0;
  let leastTwoAdj = false;
  let prev = 0;
  const arr = `${num}`.split('').map(e => parseInt(e));
  for (const i of arr) {
    // console.log(prev, i);
    if (prev > i) {
      return false;
    }
    if (i === prev) {
      if (leastTwoAdj) {
        previousAdj++;
      } else {
        leastTwoAdj = true;
        previousAdj = 2;
      }
    } else if (leastTwoAdj && previousAdj === 2) {
      addtoArr = true;
    } else {
      leastTwoAdj = false;
    }
    prev = i;
  }
  if (addtoArr || (leastTwoAdj && previousAdj === 2)) {
    return true;
  }
  return false;
};
function findPass(lower, upper) {
  const arr = [];
  for (let i = lower; i <= upper; i++) {
    // console.log(checker2(i));
    if (checker2(i)) {
      arr.push(i);
    }
  }
  console.log(arr, arr.length);
}

findPass(284639, 748759);
// console.log(checker2(288899));
// console.log(checker2(288999));
