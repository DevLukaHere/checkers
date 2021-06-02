import React, { createContext, useState, useEffect } from 'react';
import { createFromPattern } from '../models/Board';
import Move from '../models/Move';
import Field from '../models/Field';

export const TYPES = {
  BLANK: 0,
  BLACK_PAWN: 1,
  RED_PAWN: 2,
  CHECKED: 3,
  BLACK_PAWN_CHECKED: 4,
  RED_PAWN_CHECKED: 5,
};

const isDeveloperMode = true;

export const BoardContext = createContext();

const BoardContextProvider = ({ children }) => {
  //BOARD SECTION
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

  const boardGET = (x, y) => board[x][y];

  const boardSET = (x, y, newField) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((arr) => arr.slice());
      newBoard[x][y] = newField;
      return [...newBoard];
    });
  };

  const boardACTIVE = (x, y) => {
    let prevField = boardGET(x, y);
    boardSET(
      x,
      y,
      new Field(
        x,
        y,
        prevField.isEmpty,
        true,
        prevField.isPromoted,
        prevField.color
      )
    );
  };

  const boardUNACTIVE = (x, y) => {
    let prevField = boardGET(x, y);
    boardSET(
      x,
      y,
      new Field(
        x,
        y,
        prevField.isEmpty,
        false,
        prevField.isPromoted,
        prevField.color
      )
    );
  };

  useEffect(() => {
    if (isDeveloperMode) console.log('BOARD CHANGE: ', board);
  }, [board]);

  //CURRENT SECTION
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    if (current) {
      if (isDeveloperMode) console.log('FINDING MOVES FOR', current);
      if (moves) restoreFields(moves);
      findMoves(current.x, current.y);
    }
  }, [current]);

  //MOVES SECTION
  const [moves, setMoves] = useState(null);

  const findMoves = (x, y) => {
    let field = boardGET(x, y);
    let newMoves = [];

    if (field.color === 'black') {
      newMoves.push(new Move(x, y, -1, -1));
      newMoves.push(new Move(x, y, 1, -1));
    }
    if (field.color === 'red') {
      newMoves.push(new Move(x, y, -1, 1));
      newMoves.push(new Move(x, y, 1, 1));
    }

    newMoves = newMoves
      .filter((move) => move.toX >= 0 && move.toX < board[0].length)
      .filter((move) => move.toY >= 0 && move.toY < board.length);

    setMoves(newMoves);
  };

  const restoreFields = () => {
    if (isDeveloperMode) console.log('RESTORING FIELDS', moves);
    board.map((row, rowIndex) =>
      row.map((field, columnIndex) => boardUNACTIVE(rowIndex, columnIndex))
    );
  };

  useEffect(() => {
    if (moves) {
      if (isDeveloperMode) console.log('NEW MOVES', moves);
      console.log(moves);
      moves.map((move) => boardACTIVE(move.toX, move.toY));
    }
  }, [moves]);

  return (
    <BoardContext.Provider
      value={{
        board,
        boardACTIVE,
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
