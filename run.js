let numbers = [
  64,
  61,
  19,
  97,
  14,
  58,
  96,
  4,
  57,
  12,
  1,
  51,
  20,
  54,
  20,
  100,
  59,
  99,
  32,
  69,
  84,
  27,
  100,
  25,
  96,
  18,
  72,
  75,
  87,
  79,
  12,
  59,
  10,
  77,
  4,
  80,
  14,
  52,
  1,
  80,
  38,
  42,
  7,
  23,
  56,
  51,
  93,
  45,
  2,
  67,
  24,
  63,
  80,
  78,
  1,
  83,
  94,
  84,
  97,
  97,
  98,
  21,
  46,
  3,
  21,
  53,
  37,
  45,
  81,
  76,
  37,
  80,
  18,
  65,
  8,
  74,
  15,
  93,
  97,
  90,
  76,
  72,
  70,
  33,
  81,
  39,
  33,
  28,
  15,
  28,
  0,
  92,
  41,
  8,
  26,
  69,
  72,
  68,
  26,
  89
];

let sum = 66;

function tuffi(numbers, sum) {
  let index = 0;
  let currNumber = 1;
  let isFound = false;

  while (index < numbers.length && !isFound) {
    const currValue = numbers[currNumber] + numbers[index];

    if (currValue === sum) {
      isFound = true;
    }

    if (currNumber === numbers.length) {
      index++;
      currNumber = index + 1;
    } else {
      currNumber++;
    }
  }

  return isFound;
}

const stefan = (numbers, sum) => {
  const visited = new Map();
  let found = [];

  numbers.forEach((num, index) => {
    if (visited.has(sum - num)) {
      found = [numbers[visited.get(sum - num)], num];
      return;
    }
    visited.set(num, index);
  });

  return found;
};

const jamie = (numbers, sum) => {
  const seen = new Set();
  for (const number of numbers) {
    if (seen.has(sum - number)) return true;
    seen.add(number);
  }
  return false;
};

const tom = (numbers, sum) => {
  let entries = {};
  return numbers.some((number) => {
    if (entries[sum - number]) return true;
    entries[number] = true;
  });
};

const daniel = (numbers, sum) => {
  const othersides = new Map();
  let hasSum = false;

  for (const number of numbers) {
    if (!!othersides.get(number)) {
      hasSum = true;
    }
    othersides.set(sum - number, 1);
  }
  return hasSum;
};

const fns = [
  { name: "tuffi", fn: tuffi },
  { name: "tom", fn: tom },
  { name: "daniel", fn: daniel },
  { name: "jamie", fn: jamie },
  { name: "stefan", fn: stefan }
];

function runner(arg) {
  console.time(arg.name);
  for (let i = 0; i <= 1000000; i++) {
    arg.fn(numbers, sum);
  }
  console.timeEnd(arg.name);
}

function runAll() {
  fns.forEach((arg) => {
    runner(arg);
  });
}

runAll();