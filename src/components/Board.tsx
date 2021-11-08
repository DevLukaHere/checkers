import { useState, useEffect, ReactNode } from 'react';
import { fieldType } from '../App';
import Field from './Field';
import {
  FieldID,
  activeFields,
  inactiveFields,
  Move,
  getMoves,
  makeMove,
} from '../utilities/modifiers';

export type BoardProps = {
  initialPattern: number[][];
};

const Board = ({ initialPattern }: BoardProps) => {
  let {
    BLANK,
    CHECKED,
    BLACK_PAWN,
    BLACK_PAWN_CHECKED,
    RED_PAWN,
    RED_PAWN_CHECKED,
  } = fieldType;

  const [pattern, setPattern] = useState<number[][]>(initialPattern);
  const [currentTurn, setCurrentTurn] = useState<fieldType>(BLACK_PAWN);
  const [moves, setMoves] = useState<Move[]>([]);

  const changeTurn = (): void =>
    setCurrentTurn((prevState) =>
      prevState === BLACK_PAWN ? RED_PAWN : BLACK_PAWN
    );

  const handleActivation = (row: number, column: number): void => {
    setPattern((prevPattern) => {
      //Copying last pattern, inactive all active fields
      let newPattern: number[][] = inactiveFields(prevPattern);

      //Making move (if exists)
      if (moves.length) {
        moves.forEach((move) => {
          if (move.to.row === row && move.to.column === column) {
            newPattern = makeMove(newPattern, move);
            newPattern = inactiveFields(prevPattern);
            return newPattern;
          }
        });
      }

      //Searching for moves
      let newMoves: Move[] = getMoves(newPattern, row, column);

      if (newMoves.length) {
        //Activating fields
        let fields: FieldID[] = [];
        fields.push({ row, column });
        newMoves.forEach((move) => {
          let { row, column } = move.to;
          fields.push({ row, column });
        });
        newPattern = activeFields(newPattern, fields);
        setMoves(newMoves);
      }

      return newPattern;
    });
  };

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

  useEffect(() => {
    console.log('Current pattern: ', pattern);
    Print();
    // eslint-disable-next-line
  }, [pattern]);

  useEffect(() => {
    console.log('Current moves: ', moves);
    // eslint-disable-next-line
  }, [moves]);

  return (
    <table>
      <tbody>{board}</tbody>
    </table>
  );
};

export default Board;
