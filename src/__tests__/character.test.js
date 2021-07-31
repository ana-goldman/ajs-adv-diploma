import Character from '../js/Character';
import { Bowman } from '../js/Players';

test('throws an Error when asked to create Character', () => {
  expect(() => {
    new Character(1);
    throw new Error('нельзя создать Character,попробуйте другой класс');
  }).toThrow();
});

test('creates other types of players', () => {
  expect(new Bowman(1)).toEqual({
    level: 1, attack: 25, attackRadius: 2, defence: 25, distance: 2, health: 50, type: 'bowman',
  });
});
