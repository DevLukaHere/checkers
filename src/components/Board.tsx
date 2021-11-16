import { useState, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  activePawn,
  inactivePawn,
  movePawn,
  beatPawn,
  checkPossibleCapturings,
  checkMultiCapturing,
  makeMultiCapturing,
} from '../state/actions';

import Field from './Field';
import { fieldType, move } from '../types';

import { store } from '../state/store';

const Board = () => {
  const checkers = useSelector((state: any) => state.checkers);
  const dispatch = useDispatch();

  const handleClick = (row: number, column: number): void => {
    //Whose turn?
    if (isCorrectPlayer(row, column)) {
      //Do we have activePawn?
      if (checkers.activePawn !== null) {
        //Did user click the same field again?
        if (
          checkers.activePawn.row === row &&
          checkers.activePawn.column === column
        ) {
          dispatch(inactivePawn());
        } else {
          //Does the move exist in current moves?
          let move = checkers.moves.find(
            ({ to }: move) => to.row === row && to.column === column
          );
          if (move) {
            //Is it beating?
            if (move.capturing) {
              //Beating
              dispatch(beatPawn(move));

              //Is there multi capturing?
              let { row, column } = move.to;
              dispatch(checkMultiCapturing({ row, column }));
              if (checkers.multiCapturing.length) {
                console.log('MULTIII');
                //dispatch(makeMultiCapturing({ row, column }));
              } else {
                //Checking if next player has a capturing move
                dispatch(checkPossibleCapturings());
              }
            } else {
              //Capturing is obligatory
              if (checkers.isCapturingMove) {
                alert('You have to beat pawn!');
                dispatch(inactivePawn());
              } else {
                //Making standard move
                dispatch(movePawn(move));
                //Checking if next player has a capturing move
                dispatch(checkPossibleCapturings());
              }
            }
          } else {
            //Move doesn't exist in the moves => getting new activePawn
            dispatch(activePawn({ row, column }));
          }
        }
      } else {
        //No activePawn => activating pawn
        dispatch(activePawn({ row, column }));
      }
    }
  };

  const isCorrectPlayer = (row: number, column: number): boolean => {
    let { BLACK_PAWN, RED_PAWN, BLANK } = fieldType;

    let { isBlackTurn } = store.getState().checkers;

    let type = checkers.pattern[row][column];

    if (type !== BLACK_PAWN && type !== RED_PAWN && type !== BLANK) return true;

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
