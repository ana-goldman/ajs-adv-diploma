import { playerTeam, computerTeam } from './Team';
import PositionedCharacter from './PositionedCharacter';
/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  shuffle(allowedTypes);
  for (let i = 0; i < allowedTypes.length; i += 1) {
    const level = Math.floor(Math.random() * (Math.floor(maxLevel) - Math.ceil(1))) + Math.ceil(1);
    yield new allowedTypes[i](level);
  }
}

export function generateTeam(allowedTypes, maxLevel, characterCount, team) {
  // TODO: write logic here
  for (let i = 0; i < characterCount; i += 1) {
    const character = characterGenerator(allowedTypes, maxLevel).next();
    if (team === playerTeam) {
      const position = definePosition(playerTeam)[getRandom(16)];
      // playerTeam.team.forEach((char) => {
      //   if (char.position === position) position = definePosition(playerTeam)[getRandom(16)];
      // });
      playerTeam.team.push(new PositionedCharacter(character.value, position));
    } else {
      const position = definePosition(computerTeam)[getRandom(16)];
      // computerTeam.team.forEach((char) => {
      //   if (char.position === position) position = definePosition(playerTeam)[getRandom(16)];
      // });
      computerTeam.team.push(new PositionedCharacter(character.value, position));
    }
  }
}

function definePosition(team) {
  const positionArr = [];
  const value = team === playerTeam ? 0 : 6;

  for (let i = 0; i <= 8 - 1; i += 1) {
    positionArr.push(value + 8 * i);
    positionArr.push((value + 1) + 8 * i);
  }
  return positionArr;
}

function getRandom(max) { // generates random number
  return Math.floor(Math.random() * max);
}

function shuffle(array) { // mixing array elements
  for (let i = array.length - 1; i > 0; i -= 1) {
    const num = Math.floor(Math.random() * (i + 1));
    const d = array[num];
    array[num] = array[i];
    array[i] = d;
  }
  return array;
}
