test('tagged template', () => {
  const level = 1;
  const attack = 25;
  const defence = 25;
  const health = 50;
  expect(`🎖 ${level} ⚔ ${attack} 🛡 ${defence} ❤ ${health}`).toBe('🎖 1 ⚔ 25 🛡 25 ❤ 50');
});
