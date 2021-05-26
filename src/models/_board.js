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
}

export default _board;
