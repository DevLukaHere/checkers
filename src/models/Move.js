export default class Move {
  constructor(fromRow, fromColumn, rowShift, columnShift) {
    this.fromRow = fromRow;
    this.fromColumn = fromColumn;
    this.toRow = fromRow + rowShift;
    this.toColumn = fromColumn + columnShift;
  }
}
