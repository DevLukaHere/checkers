import { useState, useEffect, ReactNode } from 'react';
import Field from './Field';

export type BoardProps = {
  initialPattern: number[][];
};

type ActiveFieldProps = {
  row: number;
  column: number;
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
  const [activeField, setActiveField] = useState<ActiveFieldProps | null>(null);

  const changeField = (field: fieldType) => {
    switch (field) {
      case fieldType.BLACK_PAWN_CHECKED:
        return fieldType.BLACK_PAWN;

      case fieldType.RED_PAWN_CHECKED:
        return fieldType.RED_PAWN;

      default:
        return field;
    }
  };

  const handleActivation = (row: number, column: number) => {
    let newPattern = pattern.map((row) => row);

    let field: fieldType = pattern[row][column];
    switch (field) {
      case fieldType.BLACK_PAWN:
        pattern[row][column] = fieldType.BLACK_PAWN_CHECKED;
        break;
      case fieldType.RED_PAWN:
        pattern[row][column] = fieldType.RED_PAWN_CHECKED;
        break;
      default:
        break;
    }

    setActiveField((prevstate) => {
      //Deleting last checked field
      if (prevstate) {
        newPattern[prevstate.row][prevstate.column] = changeField(
          newPattern[prevstate.row][prevstate.column]
        );
      }
      //Clicking same field again - inactive field
      if (prevstate && prevstate.row === row && prevstate.column === column)
        return null;

      return { row, column };
    });

    console.log('New pattern: ', pattern);
    setPattern(newPattern);
  };

  useEffect(() => {
    console.log('Activefield:', activeField);
    // eslint-disable-next-line
  }, [activeField]);

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
            setActive={() => handleActivation(row, column)}
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
            setActive={() => handleActivation(row, column)}
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
            setActive={() => handleActivation(row, column)}
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
            setActive={() => handleActivation(row, column)}
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
            setActive={() => handleActivation(row, column)}
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
