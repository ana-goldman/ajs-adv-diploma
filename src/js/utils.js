export function calcTileType(index, boardSize) {
  // TODO: write logic here
  switch (index) {
    case (0):
      return 'top-left';
    case (boardSize - 1):
      return 'top-right';
    case (boardSize * boardSize - 1):
      return 'bottom-right';
    case (boardSize * boardSize - boardSize):
      return 'bottom-left';
    default:
  }
  while (index <= boardSize - 1) return 'top';
  while (index >= boardSize * boardSize - boardSize) return 'bottom';
  for (let i = boardSize; i <= boardSize * (boardSize - 2); i += boardSize) {
    if (i === index) return 'left';
  }
  for (let i = boardSize + boardSize - 1; i <= boardSize * boardSize - boardSize; i += boardSize) {
    if (i === index) return 'right';
  }

  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
