class _pawn {
  constructor(id, player, type, x, y) {
    this.id = id || undefined;
    this.player = player || undefined;
    this.type = type || undefined;
    this.position = { X: x, Y: y } || null;
  }
}

export default _pawn;
