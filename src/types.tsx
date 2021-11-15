export enum fieldType {
  BLANK,
  CHECKED,
  BLACK_PAWN,
  BLACK_PAWN_CHECKED,
  RED_PAWN,
  RED_PAWN_CHECKED,
}

export type fieldID = {
  row: number;
  column: number;
};

export type move = {
  from: fieldID;
  to: fieldID;
  capturing?: fieldID;
};
