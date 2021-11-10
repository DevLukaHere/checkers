import { useState, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { pawnMove } from '../actions';
import { fieldType } from '../utilities/modifiers';
import Field from './Field';
import {
  FieldID,
  activeFields,
  inactiveFields,
  Move,
  getMoves,
  makeMove,
} from '../utilities/modifiers';

const Board = () => {
  let {
    BLANK,
    CHECKED,
    BLACK_PAWN,
    BLACK_PAWN_CHECKED,
    RED_PAWN,
    RED_PAWN_CHECKED,
  } = fieldType;

  const pattern = useSelector((state: any) => state.pattern);
  const dispatch = useDispatch();

  const [activeField, setActiveField] = useState<FieldID | null>(null);

  const [currentTurn, setCurrentTurn] = useState<fieldType>(BLACK_PAWN);
  const [moves, setMoves] = useState<Move[]>([]);

  const changeTurn = (): void =>
    setCurrentTurn((prevState) =>
      prevState === BLACK_PAWN ? RED_PAWN : BLACK_PAWN
    );

  const handleActivation = (row: number, column: number): void => {
    dispatch(pawnMove());

    // if (activeField) {
    //   //The same field clicked again
    //   if (activeField.row === row && activeField.column === column) {
    //     setActiveField(null);
    //   } else {
    //     let clickedField: fieldType = pattern[row][column];
    //     //The user makes move
    //     if (clickedField === CHECKED) {
    //       setPattern((currentPattern) => {
    //         let newMove = moves.find(
    //           (move) => move.to.row === row && move.to.column === column
    //         );
    //         if (newMove) {
    //           let newPattern: number[][] = makeMove(currentPattern, newMove);
    //           return newPattern;
    //         }
    //         return currentPattern;
    //       });
    //       setActiveField(null);
    //     } else {
    //       //The user clicked another field
    //       setActiveField({ row, column });
    //     }
    //   }
    // } else {
    //   //Was pawn clicked?
    //   if (
    //     pattern[row][column] === BLACK_PAWN ||
    //     pattern[row][column] === RED_PAWN
    //   ) {
    //     setActiveField({ row, column });
    //   } else {
    //     console.log('Not pawn clicked!');
    //   }
    // }
  };

  useEffect(() => {
    //Searching for moves
    if (activeField) {
      let newMoves: Move[] = getMoves(
        pattern,
        activeField.row,
        activeField.column
      );

      if (newMoves.length) setMoves(newMoves);
    } else {
      setMoves([]);
    }
    // eslint-disable-next-line
  }, [activeField]);

  useEffect(() => {
    // //Showing possible moves
    // if (moves.length) {
    //   setPattern((currentPattern) => {
    //     let newPattern: number[][] = inactiveFields(currentPattern);
    //     newPattern = activeFields(newPattern, moves);
    //     return newPattern;
    //   });
    // } else {
    //   setPattern((currentPattern) => {
    //     let newPattern: number[][] = inactiveFields(currentPattern);
    //     return newPattern;
    //   });
    // }
  }, [moves]);

  useEffect(() => {
    Print();
    // eslint-disable-next-line
  }, [pattern]);

  const [board, setBoard] = useState<JSX.Element[] | null>(null);

  const Transform = (
    row: number,
    column: number,
    type: fieldType
  ): JSX.Element | null => {
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
            setActive={() => handleActivation(row, column)}
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
            setActive={() => handleActivation(row, column)}
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
            setActive={() => handleActivation(row, column)}
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
            setActive={() => handleActivation(row, column)}
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
            setActive={() => handleActivation(row, column)}
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
            setActive={() => handleActivation(row, column)}
          />
        );
      default:
        return null;
    }
  };

  const Print = () => {
    let newBoard: JSX.Element[] = [];

    let newRow: ReactNode[] | null = [];
    for (let row = 0; row < pattern.length; row++) {
      for (let column = 0; column < pattern[0].length; column++) {
        newRow.push(Transform(row, column, pattern[row][column]));
      }

      newBoard[row] = <tr key={row}>{newRow}</tr>;
      newRow = [];
    }

    setBoard(newBoard);
  };

  return (
    <table>
      <tbody>{board}</tbody>
    </table>
  );
};

export default Board;
