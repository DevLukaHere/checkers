import { useState, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { activePawn, inactivePawn, movePawn } from '../state/actions';

import Field from './Field';
import { fieldType, move } from '../types';

import { store } from '../state/store';

const Board = () => {
  const checkers = useSelector((state: any) => state.checkers);

  const dispatch = useDispatch();

  const handleClick = (row: number, column: number): void => {
    //Whose turn
    if (isCorrectPlayer(row, column)) {
      //Do we have activePawn?
      if (checkers.activePawn !== null) {
        if (
          checkers.activePawn.row === row &&
          checkers.activePawn.column === column
        ) {
          //Clicked the same field
          dispatch(inactivePawn());
        } else {
          //Is it a correct move?
          let move = checkers.moves.find(
            (move: move) => move.to.row === row && move.to.column === column
          );
          if (move)
            //Making move
            dispatch(movePawn(move));
          //Changing activePawn
          else dispatch(activePawn({ row, column }));
        }
      } else {
        //Activating pawn
        dispatch(activePawn({ row, column }));
      }
    }
  };

  const isCorrectPlayer = (row: number, column: number): boolean => {
    let { BLACK_PAWN, RED_PAWN } = fieldType;

    let { isBlackTurn } = store.getState().checkers;

    let type = checkers.pattern[row][column];

    if (type !== BLACK_PAWN && type !== RED_PAWN) return true;

    if (type === BLACK_PAWN && isBlackTurn === true) return true;

    if (type === RED_PAWN && isBlackTurn === false) return true;

    return false;
  };

  const [board, setBoard] = useState<JSX.Element[] | null>(null);

  const createField = (
    row: number,
    column: number,
    type: fieldType
  ): JSX.Element | null => {
    let {
      BLANK,
      CHECKED,
      BLACK_PAWN,
      BLACK_PAWN_CHECKED,
      RED_PAWN,
      RED_PAWN_CHECKED,
    } = fieldType;

    switch (type) {
      case BLANK:
        return (
          <Field
            key={`${row}_${column}`}
            row={row}
            column={column}
            isEmpty={true}
            isActive={false}
            isPromoted={false}
            color="blank"
            handleClick={() => handleClick(row, column)}
          />
        );
      case CHECKED:
        return (
          <Field
            key={`${row}_${column}`}
            row={row}
            column={column}
            isEmpty={true}
            isActive={true}
            isPromoted={false}
            color="blank"
            handleClick={() => handleClick(row, column)}
          />
        );
      case BLACK_PAWN:
        return (
          <Field
            key={`${row}_${column}`}
            row={row}
            column={column}
            isEmpty={false}
            isActive={false}
            isPromoted={false}
            color="black"
            handleClick={() => handleClick(row, column)}
          />
        );
      case RED_PAWN:
        return (
          <Field
            key={`${row}_${column}`}
            row={row}
            column={column}
            isEmpty={false}
            isActive={false}
            isPromoted={false}
            color="red"
            handleClick={() => handleClick(row, column)}
          />
        );
      case BLACK_PAWN_CHECKED:
        return (
          <Field
            key={`${row}_${column}`}
            row={row}
            column={column}
            isEmpty={false}
            isActive={true}
            isPromoted={false}
            color="black"
            handleClick={() => handleClick(row, column)}
          />
        );
      case RED_PAWN_CHECKED:
        return (
          <Field
            key={`${row}_${column}`}
            row={row}
            column={column}
            isEmpty={false}
            isActive={true}
            isPromoted={false}
            color="red"
            handleClick={() => handleClick(row, column)}
          />
        );
      default:
        return null;
    }
  };

  const print = (pattern: number[][]) => {
    let newBoard: JSX.Element[] = [];

    let newRow: ReactNode[] | null = [];
    for (let row = 0; row < pattern.length; row++) {
      for (let column = 0; column < pattern[0].length; column++) {
        newRow.push(createField(row, column, pattern[row][column]));
      }

      newBoard[row] = <tr key={row}>{newRow}</tr>;
      newRow = [];
    }

    setBoard(newBoard);
  };

  useEffect(() => {
    console.log(checkers);
    print(checkers.pattern);
    // eslint-disable-next-line
  }, [checkers]);

  return (
    <table>
      <tbody>{board}</tbody>
    </table>
  );
};

export default Board;
