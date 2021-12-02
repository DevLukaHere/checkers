import { fieldType, fieldID, move } from './types';

let {
  BLANK,
  CHECKED,
  BLACK_PAWN,
  BLACK_PAWN_CHECKED,
  RED_PAWN,
  RED_PAWN_CHECKED,
} = fieldType;

const checkMove = (
  pattern: number[][],
  row: number,
  rowShift: number,
  column: number,
  columnShift: number,
  moves: move[]
): void => {
  let fromField: fieldType = pattern[row][column];

  if (isOutOfBoundaries(row + rowShift, column + columnShift)) return;
  let toField: fieldType = pattern[row + rowShift][column + columnShift];

  //BLACK_PAWN
  if (fromField === BLACK_PAWN && isFieldFree(toField)) {
    moves.push({
      from: { row, column },
      to: { row: row + rowShift, column: column + columnShift },
    });
  }

  //RED_PAWN
  if (fromField === RED_PAWN && isFieldFree(toField)) {
    moves.push({
      from: { row, column },
      to: { row: row + rowShift, column: column + columnShift },
    });
  }
};

const checkBeat = (
  pattern: number[][],
  row: number,
  rowShift: number,
  column: number,
  columnShift: number,
  moves: move[]
): void => {
  let fromField: fieldType = pattern[row][column];

  if (isOutOfBoundaries(row + rowShift, column + columnShift)) return;
  let capturedField: fieldType = pattern[row + rowShift][column + columnShift];

  if (isOutOfBoundaries(row + 2 * rowShift, column + 2 * columnShift)) return;
  let toField: fieldType =
    pattern[row + 2 * rowShift][column + 2 * columnShift];

  //BLACK_PAWN
  if (
    fromField === BLACK_PAWN &&
    capturedField === RED_PAWN &&
    isFieldFree(toField)
  ) {
    moves.push({
      from: { row, column },
      to: { row: row + 2 * rowShift, column: column + 2 * columnShift },
      capturing: { row: row + rowShift, column: column + columnShift },
    });
  }

  //RED_PAWN
  if (
    fromField === RED_PAWN &&
    capturedField === BLACK_PAWN &&
    isFieldFree(toField)
  ) {
    moves.push({
      from: { row, column },
      to: { row: row + 2 * rowShift, column: column + 2 * columnShift },
      capturing: { row: row + rowShift, column: column + columnShift },
    });
  }
};

export const getPawnMoves = (pattern: number[][], fieldID: fieldID): move[] => {
  let { row, column } = fieldID;
  let type = pattern[row][column];
  let moves: move[] = [];

  if (type === BLACK_PAWN) {
    checkMove(pattern, row, 1, column, -1, moves);
    checkMove(pattern, row, 1, column, 1, moves);
  }
  if (type === RED_PAWN) {
    checkMove(pattern, row, -1, column, -1, moves);
    checkMove(pattern, row, -1, column, 1, moves);
  }

  //Beating
  checkBeat(pattern, row, 1, column, -1, moves);
  checkBeat(pattern, row, 1, column, 1, moves);
  checkBeat(pattern, row, -1, column, -1, moves);
  checkBeat(pattern, row, -1, column, 1, moves);

  //If capturing, we remove standard moves
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
    let checkedFields: fieldID[] = [];

    let { row, column } = moves[0].from;
    checkedFields.push({ row, column });
    moves.forEach((move) => {
      let { row, column } = move.to;
      checkedFields.push({ row, column });
    });

    checkedFields.forEach((field) => {
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

const isOutOfBoundaries = (shiftedRow: number, shiftedColumn: number) => {
  if (shiftedRow < 0 || shiftedRow > 7) return true;
  if (shiftedColumn < 0 || shiftedColumn > 7) return true;

  return false;
};

const isFieldFree = (field: fieldType): boolean => {
  return field === BLANK || field === CHECKED ? true : false;
};

export const makeMove = (
  pattern: number[][],
  { to, from }: move
): number[][] => {
  let newPattern: number[][] = pattern.map((row) => row.map((field) => field));

  //Clearing all checked fields
  newPattern = clearPossibleMoves(newPattern);

  //Moving pawn
  newPattern[to.row][to.column] = newPattern[from.row][from.column];

  //Deleting pawn from start position
  newPattern[from.row][from.column] = BLANK;

  return newPattern;
};

export const makeBeat = (
  pattern: number[][],
  { to, from, capturing }: move
): number[][] => {
  let newPattern: number[][] = pattern.map((row) => row.map((field) => field));

  console.log({ to, from, capturing });

  //Clearing all checked fields
  newPattern = clearPossibleMoves(newPattern);

  //Moving pawn
  newPattern[to.row][to.column] = newPattern[from.row][from.column];

  //Deleting pawn from starting position
  newPattern[from.row][from.column] = BLANK;

  //Deleting captured pawn
  if (capturing) newPattern[capturing.row][capturing.column] = BLANK;

  return newPattern;
};

export const includesCapturing = (moves: move[]): boolean => {
  let isBeating = false;
  moves.forEach((move) => {
    if (move.capturing) isBeating = true;
  });

  return isBeating;
};

export const isBeatingGloballyPossible = (
  pattern: number[][],
  isBlackTurn: boolean
): boolean => {
  let playerFields: fieldID[] = [];
  for (let row = 0; row < pattern.length; row++) {
    for (let column = 0; column < pattern[0].length; column++) {
      let type = pattern[row][column];
      if (
        (isBlackTurn && type === BLACK_PAWN) ||
        (!isBlackTurn && type === RED_PAWN)
      )
        playerFields.push({ row, column });
    }
  }

  let allPossibleMoves: move[] = [];

  playerFields.forEach((field) => {
    let fieldMoves = getPawnMoves(pattern, field);
    fieldMoves.forEach((move) => allPossibleMoves.push(move));
  });

  let isBeating = false;
  allPossibleMoves.forEach((move) => {
    if (move.capturing) {
      isBeating = true;
      console.log('Beating: ', move);
    }
  });

  return isBeating;
};
