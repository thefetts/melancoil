const Melancoil = require('../app/melancoil.js');

describe('Melancoil', () => {
  describe('map', () => {
    it('calculates a list of numbers and the sum of their digits squared (by default)', () => {
      const map = (new Melancoil()).map(1);
      expect(map).toEqual({1: 1});
    });

    it('calculates recursively', () => {
      const map = (new Melancoil()).map(2);
      expect(map[2]).toEqual(4);
      expect(map[4]).toEqual(16);
      expect(map[16]).toEqual(37);
      expect(map[37]).toEqual(58);
      expect(map[58]).toEqual(89);
      expect(map[89]).toEqual(145);
      expect(map[145]).toEqual(42);
      expect(map[42]).toEqual(20);
      expect(map[20]).toEqual(4);

      expect(map[5]).toBeUndefined();
    });

    it('sets permutations', () => {
      const map = (new Melancoil(2, true)).map(2);
      expect(map[61]).toEqual(37);
      expect(map[73]).toEqual(58);
      expect(map[85]).toEqual(89);
      expect(map[98]).toEqual(145);
      expect(map[154]).toEqual(42);
      expect(map[514]).toEqual(42);
      expect(map[541]).toEqual(42);
      expect(map[451]).toEqual(42);
      expect(map[415]).toEqual(42);
      expect(map[24]).toEqual(20);

      expect(map[5]).toBeUndefined();
    });

    it('can use higher exponents', () => {
      const map = (new Melancoil(3)).map(2);
      expect(map[2]).toEqual(8);
      expect(map[8]).toEqual(512);
      expect(map[512]).toEqual(134);

      const map2 = (new Melancoil(5)).map(2);
      expect(map2[2]).toEqual(32);
      expect(map2[32]).toEqual(275);
      expect(map2[275]).toEqual(19964);
    });
  });

  describe('walk', () => {
    it('returns the happification steps for a number', () => {
      expect((new Melancoil()).destiny(1)).toEqual('1');
      expect((new Melancoil()).destiny(31)).toEqual('31 -> 10 -> 1');
      expect((new Melancoil()).destiny(946)).toEqual('946 -> 133 -> 19 -> 82 -> 68 -> 100 -> 1');
    });

    it('identifies melancoils', () => {
      expect((new Melancoil()).destiny(42)).toEqual('42 -> 20 -> 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 LOOPED!');
      expect((new Melancoil()).destiny(144)).toEqual('144 -> 33 -> 18 -> 65 -> 61 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4 -> 16 -> 37 LOOPED!');
    });
  });
});
