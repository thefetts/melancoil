module.exports = class Melancoil {
  constructor(exponent = 2, permutations = false) {
    this.exponent = exponent;
    this.permutations = permutations;
  }

  map(max) {
    const map = {};
    for (let i = 1; i <= max; i++) {
      this.setNext(i, map);
    }
    return map;
  }

  destiny(num) {
    let walk = num + '', next = num;
    const seen = [num];
    while (num > 1) {
      next = happify(next);
      walk += ` -> ${next}`;
      if (seen.indexOf(next) > -1) {
        walk += ` LOOPED!`;
        break;
      }
      seen.push(next);
      if (next === 1) break;
    }
    return walk;
  }

  setNext(num, map) {
    if (!map[num]) {
      const sum = happify(num, this.exponent);
      const permutations = getPermutations(num);
      permutations.forEach(permutation => {
        map[permutation] = sum;
      });
      this.setNext(sum, map);
    }
  }
};

function getPermutations(num) {
  const result = [];

  function permute(chars, list = []) {
    if (!chars.length)
      result.push(+(list.join('')));
    else
      chars.forEach((_, i) => {
        const copy = chars.slice();
        const next = copy.splice(i, 1);
        permute(copy, list.concat(next))
      });
  }

  permute((num + '').split(''));

  return [...new Set(result)];
}

function happify(num, exponent = 2) {
  return (num + '').split('')
    .reduce((sum, current) => current ** exponent + sum,
      0);
}
