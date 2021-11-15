import { fieldType, fieldID, move } from '../types';

let {
  BLANK,
  CHECKED,
  BLACK_PAWN,
  BLACK_PAWN_CHECKED,
  RED_PAWN,
  RED_PAWN_CHECKED,
} = fieldType;

export const getPawnMoves = (pattern: number[][], fieldID: fieldID): move[] => {
  let { row, column } = fieldID;
  let moves: move[] = [];

  checkMove(pattern, row, 1, column, -1, moves);
  checkMove(pattern, row, 1, column, 1, moves);
  checkMove(pattern, row, -1, column, -1, moves);
  checkMove(pattern, row, -1, column, 1, moves);

  //If yes, we remove standard moves
  if (includesCapturing(moves)) moves = moves.filter((move) => move.capturing);

  return moves;
};

export const showPossibleMoves = (
  pattern: number[][],
  fieldID: fieldID
): number[][] => {
  //Copying current pattern
  let newPattern: number[][] = pattern.map((row) => row.map((field) => field));

  //Clearing all checked fields
  newPattern = clearPossibleMoves(newPattern);

  //Checking for moves
  let moves: move[] = getPawnMoves(newPattern, fieldID);

  if (moves.length) {
    //Activating fields
    let fields: fieldID[] = [];

    let { row, column } = moves[0].from;
    fields.push({ row, column });
    moves.forEach((move) => {
      let { row, column } = move.to;
      fields.push({ row, column });
    });

    fields.forEach((field) => {
      newPattern[field.row][field.column] = toggleFieldActive(
        newPattern[field.row][field.column]
      );
    });
  }

  return newPattern;
};

const toggleFieldActive = (field: fieldType): fieldType => {
  switch (field) {
    case BLANK:
      return CHECKED;
    case CHECKED:
      return BLANK;
    case BLACK_PAWN:
      return BLACK_PAWN_CHECKED;
    case RED_PAWN:
      return RED_PAWN_CHECKED;
    case BLACK_PAWN_CHECKED:
      return BLACK_PAWN;
    case RED_PAWN_CHECKED:
      return RED_PAWN;
    default:
      return field;
  }
};

export const clearPossibleMoves = (pattern: number[][]): number[][] => {
  let newPattern: number[][] = pattern.map((row) =>
    row.map((field) =>
      field === CHECKED ||
      field === BLACK_PAWN_CHECKED ||
      field === RED_PAWN_CHECKED
        ? toggleFieldActive(field)
        : field
    )
  );
  return newPattern;
};

const isOutOfBundaries = (shiftedRow: number, shiftedColumn: number) => {
  if (shiftedRow < 0 || shiftedRow > 7) return true;
  if (shiftedColumn < 0 || shiftedColumn > 7) return true;

  return false;
};

const checkMove = (
  pattern: number[][],
  row: number,
  rowShift: number,
  column: number,
  columnShift: number,
  moves: move[]
): void => {
  let currentField: fieldType = pattern[row][column];

  if (isOutOfBundaries(row + rowShift, column + columnShift)) return;
  let firstField: fieldType = pattern[row + rowShift][column + columnShift];

  //Standard BLACK_PAWN move
  if (currentField === BLACK_PAWN && isFieldFree(firstField) && rowShift > 0) {
    moves.push({
      from: { row, column },
      to: { row: row + rowShift, column: column + columnShift },
    });
  }

  //Standard RED_PAWN move
  if (currentField === RED_PAWN && isFieldFree(firstField) && rowShift < 0) {
    moves.push({
      from: { row, column },
      to: { row: row + rowShift, column: column + columnShift },
    });
  }

  if (isOutOfBundaries(row + 2 * rowShift, column + 2 * columnShift)) return;
  let secondField: fieldType =
    pattern[row + 2 * rowShift][column + 2 * columnShift];

  //Capturing by BLACK_PAWN
  if (
    currentField === BLACK_PAWN &&
    firstField === RED_PAWN &&
    isFieldFree(secondField)
  ) {
    moves.push({
      from: { row, column },
      to: { row: row + 2 * rowShift, column: column + 2 * columnShift },
      capturing: { row: row + rowShift, column: column + columnShift },
    });
  }

  //Capturing by RED_PAWN
  if (
    currentField === RED_PAWN &&
    firstField === BLACK_PAWN &&
    isFieldFree(secondField)
  ) {
    moves.push({
      from: { row, column },
      to: { row: row + 2 * rowShift, column: column + 2 * columnShift },
      capturing: { row: row + rowShift, column: column + columnShift },
    });
  }
};

export const makeMove = (pattern: number[][], move: move): number[][] => {
  let newPattern: number[][] = pattern.map((row) => row.map((field) => field));

  //Clearing all checked fields
  newPattern = clearPossibleMoves(newPattern);

  //Moving pawn
  newPattern[move.to.row][move.to.column] =
    newPattern[move.from.row][move.from.column];

  //Deleting pawn from starting position
  newPattern[move.from.row][move.from.column] = BLANK;

  //Deleting captured pawn
  if (move.capturing)
    newPattern[move.capturing.row][move.capturing.column] = BLANK;

  return newPattern;
};

const includesCapturing = (moves: move[]): boolean => {
  let isCapturing = false;
  moves.forEach((move) => {
    if (move.capturing) isCapturing = true;
  });

  return isCapturing;
};

export const checkIfCapturingExists = (
  pattern: number[][],
  isBlackTurn: boolean
): boolean => {
  let capturingExists = false;

  let moves: move[] = [];
  for (let row = 0; row < pattern.length; row++) {
    for (let column = 0; column < pattern[0].length; column++) {
      if (
        (isBlack(pattern[row][column]) && isBlackTurn) ||
        (isRed(pattern[row][column]) && !isBlackTurn)
      )
        getPawnMoves(pattern, { row, column }).map((move) => moves.push(move));
    }
  }
  console.log(moves, pattern);
  if (includesCapturing(moves)) capturingExists = true;

  return capturingExists;
};

const isFieldFree = (field: fieldType): boolean => {
  return field === BLANK || field === CHECKED ? true : false;
};

const isBlack = (field: fieldType): boolean => {
  return field === BLACK_PAWN || field === BLACK_PAWN_CHECKED ? true : false;
};

const isRed = (field: fieldType): boolean => {
  return field === RED_PAWN || field === RED_PAWN_CHECKED ? true : false;
};
