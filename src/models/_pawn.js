import Move from './_move';
class _pawn {
  constructor(id, player, type, x, y, board) {
    this.id = id || undefined;
    this.player = player || undefined;
    this.type = type || undefined;
    this.position = { X: x, Y: y } || null;
    this.board = board || null;
  }

  getMoves = () => {
    const moves = [];
    if (this.player === 'first') {
      moves.push(this.checkMove(-1, -1));
      moves.push(this.checkMove(1, -1));
    }

    if (this.player === 'second') {
      moves.push(this.checkMove(-1, 1));
      moves.push(this.checkMove(1, 1));
    }

    return moves.filter((el) => el !== null);
  };

  checkMove = (moveX, moveY) => {
    let destination = {
      X: this.position.X + moveX,
      Y: this.position.Y + moveY,
    };

    if (this.isOutOfBoundaries(destination.X, destination.Y)) return null;
    if (!this.isOccupied(destination.X, destination.Y)) {
      return new Move(this.id, this.position, destination, 'MOVE', null);
    } else {
      let beatDestination = {
        X: this.position.X + 2 * moveX,
        Y: this.position.Y + 2 * moveY,
      };

      //check if can we beat pawn
      if (!this.isOccupied(beatDestination.X, beatDestination.Y))
        return new Move(
          this.id,
          this.position,
          beatDestination,
          'BEAT',
          destination
        );
    }
    return null;
  };

  isOutOfBoundaries = (positionX, positionY) => {
    console.log('bandaries', positionX, positionY);
    if (positionX < 0 || positionX > this.board.size.X) return true;

    if (positionY < 0 || positionY > this.board.size.Y) return true;

    return false;
  };

  isOccupied = (positionX, positionY) => {
    if (this.board.table[positionX][positionY]) return true;
    else return false;
  };
}

export default _pawn;
