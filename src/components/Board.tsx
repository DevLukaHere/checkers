import { useState, useEffect, ReactNode } from 'react';
import Field from './Field';

export type BoardProps = {
  initialPattern: number[][];
};

enum fieldType {
  BLANK,
  BLACK_PAWN,
  RED_PAWN,
  BLACK_PAWN_CHECKED,
  RED_PAWN_CHECKED,
}

const Board = ({ initialPattern }: BoardProps) => {
  const [pattern, setPattern] = useState<number[][]>(initialPattern);

  const activeField = (row: number, column: number) => {
    let newPattern = pattern.map((row) => row);
    if (newPattern[row][column] === fieldType.BLACK_PAWN)
      newPattern[row][column] = fieldType.BLACK_PAWN_CHECKED;

    if (newPattern[row][column] === fieldType.RED_PAWN)
      newPattern[row][column] = fieldType.RED_PAWN_CHECKED;

    console.log('New pattern: ', pattern);
    setPattern(newPattern);
  };

  const transformNumberToField = (
    row: number,
    column: number,
    type: fieldType
  ): JSX.Element | null => {
    switch (type) {
      case fieldType.BLANK:
        return (
          <Field
            key={`${row}_${column}`}
            row={row}
            column={column}
            isEmpty={true}
            isActive={false}
            isPromoted={false}
            color="blank"
            setActive={() => activeField(row, column)}
          />
        );
      case fieldType.BLACK_PAWN:
        return (
          <Field
            key={`${row}_${column}`}
            row={row}
            column={column}
            isEmpty={false}
            isActive={false}
            isPromoted={false}
            color="black"
            setActive={() => activeField(row, column)}
          />
        );
      case fieldType.RED_PAWN:
        return (
          <Field
            key={`${row}_${column}`}
            row={row}
            column={column}
            isEmpty={false}
            isActive={false}
            isPromoted={false}
            color="red"
            setActive={() => activeField(row, column)}
          />
        );
      case fieldType.BLACK_PAWN_CHECKED:
        return (
          <Field
            key={`${row}_${column}`}
            row={row}
            column={column}
            isEmpty={false}
            isActive={true}
            isPromoted={false}
            color="black"
            setActive={() => activeField(row, column)}
          />
        );
      case fieldType.RED_PAWN_CHECKED:
        return (
          <Field
            key={`${row}_${column}`}
            row={row}
            column={column}
            isEmpty={false}
            isActive={true}
            isPromoted={false}
            color="red"
            setActive={() => activeField(row, column)}
          />
        );
      default:
        return null;
    }
  };

  const [board, setBoard] = useState<JSX.Element[] | null>(null);

  const createBoardFromPattern = () => {
    let newBoard: JSX.Element[] = [];

    let newRow: ReactNode[] | null = [];
    for (let row = 0; row < pattern.length; row++) {
      for (let column = 0; column < pattern[0].length; column++) {
        newRow.push(transformNumberToField(row, column, pattern[row][column]));
      }

      newBoard[row] = <tr key={row}>{newRow}</tr>;
      newRow = [];
    }

    setBoard(newBoard);
    console.log('created board');
  };

  useEffect(() => {
    createBoardFromPattern();
    // eslint-disable-next-line
  }, [pattern]);

  return (
    <table>
      <tbody>{board}</tbody>
    </table>
  );
};

export default Board;
