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
    new Board([
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

  useEffect(() => {
    if (isDeveloperMode) console.log('BOARD CHANGE: ', board.fields);
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
      newMoves.push(new Move(row, column, 1, -1));
    }
    if (field.color === 'red') {
      newMoves.push(new Move(row, column, -1, 1));
      newMoves.push(new Move(row, column, 1, 1));
    }

    newMoves = newMoves
      .filter((move) => move.toX >= 0 && move.toX < board.rows)
      .filter((move) => move.toY >= 0 && move.toY < board.columns);

    setMoves(newMoves);
  };

  const restoreFields = () => {
    if (isDeveloperMode) console.log('RESTORING FIELDS', moves);
    board.map((row, rowIndex) =>
      row.map((field, columnIndex) =>
        board.deactiveField(rowIndex, columnIndex)
      )
    );
  };

  useEffect(() => {
    if (moves) {
      if (isDeveloperMode) console.log('NEW MOVES', moves);
      console.log(moves);
      moves.map((move) => board.activeField(move.toX, move.toY));
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
