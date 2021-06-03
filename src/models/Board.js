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
  let fields = new Array(pattern.length)
    .fill(null)
    .map(() => Array(pattern[0].length));

  for (let row = 0; row < pattern.length; row++) {
    for (let column = 0; column < pattern[0].length; column++) {
      fields[row][column] = transform(row, column, pattern[row][column]);
    }
  }

  return fields;
};

export default class Board {
  constructor(source, fromPattern) {
    this.fields = fromPattern ? createFromPattern(source) : source;
    this.rows = source.length;
    this.columns = source[0].length;
  }

  getField = (row, column) => this.fields[row][column];

  copyCurrentFields = () => {
    let copiedFields = new Array(this.rows)
      .fill(null)
      .map(() => Array(this.columns));

    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        let prevField = this.getField(row, column);
        copiedFields[row][column] = new Field(
          row,
          column,
          prevField.isEmpty,
          prevField.isActive,
          prevField.isPromoted,
          prevField.color
        );
      }
    }

    return copiedFields;
  };

  setField = (row, column, newElement) => {
    const newFields = this.copyCurrentFields();
    newFields[row][column] = newElement;

    return new Board(newFields, false);
  };

  activeFields = (fields) => {
    const newFields = this.copyCurrentFields();
    fields.forEach((field) => {
      newFields[field.row][field.column].isActive = true;
    });

    return newFields;
  };

  deactiveFields = (fields) => {
    const newFields = this.copyCurrentFields();
    fields.forEach((field) => {
      newFields[field.row][field.column].isActive = false;
    });

    return newFields;
  };
}
