export default class Move {
  constructor(fromX, fromY, shiftX, shiftY) {
    this.fromX = fromX;
    this.fromY = fromY;
    this.toX = fromX + shiftY;
    this.toY = fromY + shiftX;
  }
}
