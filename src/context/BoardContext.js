import React, { createContext, useState, useEffect } from 'react';
import { createFromPattern } from '../helpers/helpers';

export const TYPES = {
  BLANK: 0,
  BLACK_PAWN: 1,
  RED_PAWN: 2,
  CHECKED: 3,
  BLACK_PAWN_CHECKED: 4,
  RED_PAWN_CHECKED: 5,
};

export class Move {
  constructor(fromX, fromY, shiftX, shiftY) {
    this.fromX = fromX;
    this.fromY = fromY;
    this.toX = fromX + shiftY;
    this.toY = fromY + shiftX;
  }
}

const isDeveloperMode = true;

export const BoardContext = createContext();

const BoardContextProvider = ({ children }) => {
  const [board, setBoard] = useState(
    createFromPattern([
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 2, 0, 2, 0, 2, 0, 2],
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
    ])
  );

  const boardPUT = (x, y, item) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((arr) => arr.slice());
      newBoard[x][y] = item;
      return [...newBoard];
    });
  };

  const [moves, setMoves] = useState(null);

  const findMoves = (x, y) => {
    const type = board[x][y];
    let newMoves = [];

    if (type === TYPES.BLACK_PAWN_CHECKED) {
      newMoves.push(new Move(x, y, -1, -1));
      newMoves.push(new Move(x, y, 1, -1));
    }
    if (type === TYPES.RED_PAWN_CHECKED) {
      newMoves.push(new Move(x, y, -1, 1));
      newMoves.push(new Move(x, y, 1, 1));
    }

    newMoves = newMoves
      .filter((move) => move.toX >= 0 && move.toX < board[0].length)
      .filter((move) => move.toY >= 0 && move.toY < board.length);

    setMoves(newMoves);
  };

  const restore = (x, y) => {
    let type = board[x][y];

    let newType = 'X';
    if (type === TYPES.CHECKED) return TYPES.BLANK;
    if (type === TYPES.BLACK_PAWN_CHECKED) return TYPES.BLACK_PAWN;
    if (type === TYPES.RED_PAWN_CHECKED) return TYPES.RED_PAWN;

    console.log(`Restore - ${x}:${y} - type:${type} => ${newType}`);
    return newType;
  };

  const restoreFields = () => {
    if (isDeveloperMode) console.log('RESTORING FIELDS', moves);

    if (moves)
      boardPUT(
        moves[0].fromX,
        moves[0].fromY,
        restore(moves[0].fromX, moves[0].fromY)
      );

    moves.map((move) =>
      boardPUT(move.toX, move.toY, restore(move.toX, move.toY))
    );
  };

  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (isDeveloperMode) console.log('BOARD CHANGE: ', board);
  }, [board]);

  useEffect(() => {
    if (current) {
      if (isDeveloperMode) console.log('FINDING MOVES FOR', current);
      if (moves) restoreFields(moves);
      findMoves(current.x, current.y);
    }
  }, [current]);

  useEffect(() => {
    if (moves) {
      if (isDeveloperMode) console.log('NEW MOVES', moves);
      moves.forEach((move) => {
        boardPUT(move.toX, move.toY, TYPES.CHECKED);
      });
    }
  }, [moves]);

  return (
    <BoardContext.Provider
      value={{
        board,
        boardPUT,
        moves,
        current,
        setCurrent,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
