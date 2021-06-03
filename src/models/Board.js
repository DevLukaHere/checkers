import { TYPES } from '../context/BoardContext';
import Field from '../models/Field';

//row, column, isEmpty, isActive, isPromoted, color
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

const createFromPattern = (pattern) => {
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

export default class Board {
  constructor(pattern) {
    this.fields = createFromPattern(pattern);
    this.rows = pattern.length;
    this.columns = pattern[0].length;
  }

  getField = (row, column) => this.fields[row][column];

  setField = (row, column, newElement) => {
    const newBoard = this.fields.map((arr) => arr.slice());
    newBoard[row][column] = newElement;
    return [...newBoard];
  };

  activeField = (row, column) => {
    let prevField = this.getField(row, column);
    this.setField(
      row,
      column,
      new Field(
        row,
        column,
        prevField.isEmpty,
        true,
        prevField.isPromoted,
        prevField.color
      )
    );
  };

  deactiveField = (row, column) => {
    let prevField = this.getField(row, column);
    this.setField(
      row,
      column,
      new Field(
        row,
        column,
        prevField.isEmpty,
        true,
        prevField.isPromoted,
        prevField.color
      )
    );
  };
}
