import { useState, useEffect, ReactNode } from 'react';
import { fieldType } from '../App';
import Field from './Field';

export type BoardProps = {
  initialPattern: number[][];
};

const Board = ({ initialPattern }: BoardProps) => {
  const [pattern, setPattern] = useState<number[][]>(initialPattern);
  let { BLANK, BLACK_PAWN, RED_PAWN, BLACK_PAWN_CHECKED, RED_PAWN_CHECKED } =
    fieldType;

  const toggleField = (field: fieldType): fieldType => {
    switch (field) {
      case BLACK_PAWN:
        return BLACK_PAWN_CHECKED;
      case RED_PAWN:
        return RED_PAWN_CHECKED;
      case BLACK_PAWN_CHECKED:
        return BLACK_PAWN;
      case RED_PAWN_CHECKED:
        return RED_PAWN;
      default:
        return field;
    }
  };

  const handleActivation = (row: number, column: number): void => {
    setPattern((prevPattern) => {
      //Copying last pattern, inactive last active field
      let newPattern: number[][] = prevPattern.map((row) =>
        row.map((field) =>
          field === BLACK_PAWN_CHECKED || field === RED_PAWN_CHECKED
            ? toggleField(field)
            : field
        )
      );

      newPattern[row][column] = toggleField(newPattern[row][column]);

      return newPattern;
    });
  };

  const transformNumberToField = (
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
  };

  useEffect(() => {
    console.log('Current pattern: ', pattern);
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
