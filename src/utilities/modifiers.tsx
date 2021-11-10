export enum fieldType {
  BLANK,
  CHECKED,
  BLACK_PAWN,
  BLACK_PAWN_CHECKED,
  RED_PAWN,
  RED_PAWN_CHECKED,
}

let {
  BLANK,
  CHECKED,
  BLACK_PAWN,
  BLACK_PAWN_CHECKED,
  RED_PAWN,
  RED_PAWN_CHECKED,
} = fieldType;

export type FieldID = {
  row: number;
  column: number;
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

export const activeFields = (
  pattern: number[][],
  moves: Move[]
): number[][] => {
  let newPattern: number[][] = pattern.map((row) => row.map((field) => field));

  let fields: FieldID[] = [];

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

  return newPattern;
};

export const inactiveFields = (pattern: number[][]): number[][] => {
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

export type Move = {
  from: FieldID;
  to: FieldID;
  capturing?: FieldID;
};

const isFieldFree = (field: fieldType): boolean => {
  return field === BLANK || field === CHECKED ? true : false;
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
  moves: Move[]
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

export const getMoves = (
  pattern: number[][],
  row: number,
  column: number
): Move[] => {
  let moves: Move[] = [];

  checkMove(pattern, row, 1, column, -1, moves);
  checkMove(pattern, row, 1, column, 1, moves);
  checkMove(pattern, row, -1, column, -1, moves);
  checkMove(pattern, row, -1, column, 1, moves);

  return moves;
};

export const makeMove = (pattern: number[][], move: Move): number[][] => {
  let newPattern: number[][] = pattern.map((row) => row.map((field) => field));

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
