export default class Field {
  constructor(row, column, isEmpty, isActive, isPromoted, color) {
    this.row = row;
    this.column = column;
    this.isEmpty = isEmpty;
    this.isActive = isActive;
    this.isPromoted = isPromoted;
    this.color = color;
  }
}
