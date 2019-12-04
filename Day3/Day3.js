const fs = require('fs');
// Assuming an array of strings of format ['X#', 'X#', 'X#', 'X#'] where X is the direction and # is the distance traveled in that direction.

const p1 = ['R8', 'U5', 'L5', 'D3'];
const p2 = ['U7', 'R6', 'D4', 'L4'];

const p3 =
  'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83';
const p4 =
  'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7';

// Currently returns the Manhattan Distance to the closest intersection point of two wires
function main() {
  // const wires = parseRaw(p4);
  // const [wp1, wp2] = [parseWirePath(wires.wi1), parseWirePath(wires.wi2)];
  // const closest = findClosestCross(findIntersections(wp1, wp2));
  // console.log(closest);
  fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      const wires = parseRaw(data);
      const [wp1, wp2] = [parseWirePath(wires.wi1), parseWirePath(wires.wi2)];
      // const closest = findClosestCross(findIntersections(wp1, wp2));
      // console.log(closest[0].x + closest[0].y);
      const shortest = findShortestDistToCross(findIntersections(wp1, wp2));
      console.log(shortest);
    }
  });
}

// Returns an object with *W*ire*I*nstructions 1 and 2
function parseRaw(txt) {
  const [w1, w2] = [...txt.split('\n')];
  const [wi1, wi2] = [w1.split(','), w2.split(',')];
  return { wi1, wi2 };
}

function parseWirePath(arr) {
  const wirePoints = [];
  let x = 0;
  let y = 0;
  let counter = 0;
  for (let i = 0; i < arr.length; i++) {
    const inst = arr[i];
    const dis = inst.slice(1);
    switch (inst.slice(0, 1)) {
      case 'D':
        for (let j = 0; j < dis; j++) {
          wirePoints.push({ x, y: --y, steps: ++counter });
        }
        break;
      case 'L':
        for (let j = 0; j < dis; j++) {
          wirePoints.push({ x: --x, y, steps: ++counter });
        }
        break;
      case 'U':
        for (let j = 0; j < dis; j++) {
          wirePoints.push({ x, y: ++y, steps: ++counter });
        }
        break;
      case 'R':
        for (let j = 0; j < dis; j++) {
          wirePoints.push({ x: ++x, y, steps: ++counter });
        }
        break;
      default:
        break;
    }
  }
  return wirePoints;
}

function findIntersections(arr1, arr2) {
  const intersections = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = i; j < arr2.length; j++) {
      if (arr1[i].x === arr2[j].x && arr1[i].y === arr2[j].y) {
        intersections.push({
          x: arr1[i].x,
          y: arr1[i].y,
          steps: arr1[i].steps + arr2[j].steps,
        });
      }
    }
  }
  // console.log(intersections);
  return intersections;
}

function findClosestCross(inter) {
  return inter.sort((a, b) =>
    Math.abs(a.x) + Math.abs(a.y) > Math.abs(b.x) + Math.abs(b.y) ? 1 : -1
  );
}

function findShortestDistToCross(inter) {
  return inter.sort((a, b) => (a.steps > b.steps ? 1 : -1));
}

// console.log(
//   findClosestCross(findIntersections(parseWirePath(p1), parseWirePath(p2)))
// );

main();
