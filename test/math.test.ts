import { clamp } from 'math';

test('3 clamped by 1 & 2 should be 2', () => {
  expect(clamp(3, 1, 2)).toBe(2);
});

test('0 clamped by 1 & 2 should be 0', () => {
  expect(clamp(0, 1, 2)).toBe(1);
});

test('2 clamped by 1 & 2 should be 2', () => {
  expect(clamp(2, 1, 2)).toBe(2);
});
