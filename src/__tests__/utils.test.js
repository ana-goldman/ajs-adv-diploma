import { calcTileType } from '../js/utils';

test('returns top-left', () => {
  expect(calcTileType(0, 8)).toBe('top-left');
});

test('returns top-rigth', () => {
  expect(calcTileType(7, 8)).toBe('top-right');
});

test('returns bottom-left', () => {
  expect(calcTileType(56, 8)).toBe('bottom-left');
});

test('returns bottom-right', () => {
  expect(calcTileType(63, 8)).toBe('bottom-right');
});

test.each([1, 2, 3, 4, 5, 6])('returns top', (index) => {
  expect(calcTileType(index, 8)).toBe('top');
});

test.each([57, 58, 59, 60, 61, 62])('returns bottom', (index) => {
  expect(calcTileType(index, 8)).toBe('bottom');
});

test.each([8, 16, 24, 32, 40, 48])('returns left', (index) => {
  expect(calcTileType(index, 8)).toBe('left');
});

test.each([15, 23, 31, 39, 47, 55])('returns right', (index) => {
  expect(calcTileType(index, 8)).toBe('right');
});

test.each([9, 10, 11, 12, 13, 14])('returns center', (index) => {
  expect(calcTileType(index, 8)).toBe('center');
});
