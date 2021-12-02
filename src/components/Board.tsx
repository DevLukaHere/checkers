import { useState, useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import Field from './Field';
import { fieldType, fieldID } from '../utilities/types';

interface BoardProps {
  callback: (fieldID: fieldID) => void;
}

const Board = ({ callback }: BoardProps) => {
  const checkers = useSelector((state: any) => state.checkers);
  const pattern = useSelector((state: any) => state.checkers.pattern);

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
            handleClick={() => callback({ row, column })}
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
            handleClick={() => callback({ row, column })}
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
            handleClick={() => callback({ row, column })}
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
            handleClick={() => callback({ row, column })}
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
            handleClick={() => callback({ row, column })}
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
            handleClick={() => callback({ row, column })}
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
    print(pattern);
    // eslint-disable-next-line
  }, [pattern]);

  return (
    <table>
      <tbody>{board}</tbody>
    </table>
  );
};

export default Board;
