import { useState, useEffect, ReactNode } from 'react';
import { fieldType } from '../App';
import Field from './Field';

export type BoardProps = {
  initialPattern: number[][];
};

export type FieldID = {
  row: number;
  column: number;
};

export type Move = {
  from: FieldID;
  to: FieldID;
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

  const toggleFieldActive = (field: fieldType): fieldType => {
    switch (field) {
      case BLANK:
        return CHECKED;
      case CHECKED:
        return BLANK;
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

  const getMoves = (
    pattern: number[][],
    row: number,
    column: number
  ): Move[] => {
    let moves: Move[] = [];

    let field: fieldType = pattern[row][column];

    if (field === BLACK_PAWN) {
      if (pattern[row + 1][column + 1] === BLANK)
        moves.push({
          from: { row, column },
          to: { row: row + 1, column: column + 1 },
        });

      if (pattern[row + 1][column + 1] === BLANK)
        moves.push({
          from: { row, column },
          to: { row: row + 1, column: column - 1 },
        });
    }

    if (field === RED_PAWN) {
      if (pattern[row - 1][column + 1] === BLANK)
        moves.push({
          from: { row, column },
          to: { row: row - 1, column: column + 1 },
        });

      if (pattern[row - 1][column - 1] === BLANK)
        moves.push({
          from: { row, column },
          to: { row: row - 1, column: column - 1 },
        });
    }

    return moves;
  };

  const handleActivation = (row: number, column: number): void => {
    setPattern((prevPattern) => {
      //Copying last pattern, inactive all active fields
      let newPattern: number[][] = prevPattern.map((row) =>
        row.map((field) =>
          field === CHECKED ||
          field === BLACK_PAWN_CHECKED ||
          field === RED_PAWN_CHECKED
            ? toggleFieldActive(field)
            : field
        )
      );

      //Searching for moves
      let moves: Move[] = getMoves(newPattern, row, column);
      console.log(moves);

      //Activating clicked field
      if (moves.length)
        newPattern[row][column] = toggleFieldActive(newPattern[row][column]);

      //Making moves active
      moves.forEach((move) => {
        newPattern[move.to.row][move.to.column] = toggleFieldActive(
          newPattern[move.to.row][move.to.column]
        );
      });

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

  return (
    <table>
      <tbody>{board}</tbody>
    </table>
  );
};

export default Board;
