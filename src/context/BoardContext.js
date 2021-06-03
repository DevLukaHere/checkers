import React, { createContext, useState, useEffect } from 'react';
import Board from '../models/Board';
import Move from '../models/Move';

const isDeveloperMode = true;

export const TYPES = {
  BLANK: 0,
  BLACK_PAWN: 1,
  RED_PAWN: 2,
  CHECKED: 3,
  BLACK_PAWN_CHECKED: 4,
  RED_PAWN_CHECKED: 5,
};

export const BoardContext = createContext();

const BoardContextProvider = ({ children }) => {
  const [board, setBoard] = useState(
    new Board(
      [
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
      ],
      true
    )
  );

  useEffect(() => {
    if (isDeveloperMode) console.log('BOARD CHANGE: ', board);
  }, [board]);

  //CURRENT SECTION
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    if (current) {
      if (isDeveloperMode) console.log('FINDING MOVES FOR', current);
      if (moves) restoreFields(moves);
      findMoves(current.row, current.column);
    }
  }, [current]);

  //MOVES SECTION
  const [moves, setMoves] = useState(null);

  const findMoves = (row, column) => {
    let field = board.getField(row, column);
    let newMoves = [];

    if (field.color === 'black') {
      newMoves.push(new Move(row, column, -1, -1));
      newMoves.push(new Move(row, column, -1, 1));
    }
    if (field.color === 'red') {
      newMoves.push(new Move(row, column, 1, -1));
      newMoves.push(new Move(row, column, 1, 1));
    }

    newMoves = newMoves
      .filter((move) => move.toRow >= 0 && move.toRow < board.rows)
      .filter((move) => move.toColumn >= 0 && move.toColumn < board.columns);

    setMoves(newMoves);
  };

  const restoreFields = () => {
    if (isDeveloperMode) console.log('RESTORING FIELDS', moves);
    const fields = [];
    moves.forEach((move) => {
      fields.push({
        row: move.toRow,
        column: move.toColumn,
      });
    });

    setBoard(new Board(board.deactiveFields(fields), false));
  };

  useEffect(() => {
    if (moves) {
      if (isDeveloperMode) console.log('NEW MOVES', moves);
      const fields = [];
      moves.forEach((move) => {
        fields.push({
          row: move.toRow,
          column: move.toColumn,
        });
      });

      setBoard(new Board(board.activeFields(fields), false));
    }
  }, [moves]);

  return (
    <BoardContext.Provider
      value={{
        board,
        current,
        setCurrent,
        moves,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
