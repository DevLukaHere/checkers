import { TYPES } from '../context/BoardContext';

export const checkActivity = (x, y, activeMoves) => {
  activeMoves.forEach((move) => {
    if (move.toX === x && move.toY === y) return true;
  });

  return false;
};

class Field {
  constructor(row, column, isEmpty, isActive, isPromoted, color) {
    this.row = row;
    this.column = column;
    this.isEmpty = isEmpty;
    this.isActive = isActive;
    this.isPromoted = isPromoted;
    this.color = color;
  }
}

const transform = (row, column, type) => {
  switch (type) {
    case TYPES.BLANK:
      return new Field(row, column, true, false, false, false);
    case TYPES.BLACK_PAWN:
      return new Field(row, column, false, false, false, 'black');
    case TYPES.RED_PAWN:
      return new Field(row, column, false, false, false, 'red');
    case TYPES.CHECKED:
      return new Field(row, column, true, true, false, false);
    case TYPES.BLACK_PAWN_CHECKED:
      return new Field(row, column, false, true, false, 'black');
    case TYPES.RED_PAWN_CHECKED:
      return new Field(row, column, false, true, false, 'red');
    default:
      return 'TYPE NOT FOUND';
  }
};

export const createFromPattern = (pattern) => {
  let board = new Array(pattern.length)
    .fill(null)
    .map(() => Array(pattern[0].length));

  for (let row = 0; row < pattern.length; row++) {
    for (let column = 0; column < pattern[0].length; column++) {
      board[row][column] = transform(row, column, pattern[row][column]);
    }
  }

  return board;
};
