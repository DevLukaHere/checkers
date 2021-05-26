class _board {
  constructor(sizeX, sizeY) {
    this.size = { X: sizeX, Y: sizeY } || null;
    this.table = new Array(sizeY)
      .fill(null)
      .map(() => new Array(sizeX).fill(null));
  }

  getPawn(x, y) {
    return this.table[x][y];
  }

  put = (pawn) => {
    this.table[pawn.position.X][pawn.position.Y] = pawn;
    return this;
  };

  remove(x, y) {
    this.table[x][y] = null;
    return this;
  }

  move(fromX, fromY, toX, toY) {
    this.table[toX][toY] = this.table[fromX][fromY];
    this.table[fromX][fromY] = null;
  }
}

export default _board;
