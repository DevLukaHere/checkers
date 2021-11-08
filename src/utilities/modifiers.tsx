enum fieldType {
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
  fields: FieldID[]
): number[][] => {
  let newPattern: number[][] = pattern.map((row) => row.map((field) => field));

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

const checkMove = (
  pattern: number[][],
  row: number,
  rowShift: number,
  column: number,
  columnShift: number,
  moves: Move[]
) => {
  let currentField: fieldType = pattern[row][column];
  let firstField: fieldType = pattern[row + rowShift][column + columnShift];
  let secondField: fieldType =
    pattern[row + 2 * rowShift][column + 2 * columnShift];

  //Standard move
  if (firstField === BLANK || firstField === CHECKED) {
    moves.push({
      from: { row, column },
      to: { row: row + rowShift, column: column + columnShift },
    });
  }

  //Capturing by BLACK_PAWN
  if (
    currentField === BLACK_PAWN &&
    firstField === RED_PAWN &&
    secondField === BLANK
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
    secondField === BLANK
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
