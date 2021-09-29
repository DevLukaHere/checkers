import { useState, useEffect, useContext } from 'react';
import Field from './Field';

export type BoardProps = {
  pattern: number[][];
};

enum fieldType {
  BLANK,
  BLACK_PAWN,
  RED_PAWN,
  CHECKED,
  BLACK_PAWN_CHECKED,
  RED_PAWN_CHECKED,
}

const Board = ({ pattern }: BoardProps) => {
  const transformNumberToField = (
    row: number,
    column: number,
    type: fieldType
  ) => {
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
          />
        );
      case fieldType.CHECKED:
        return (
          <Field
            key={`${row}_${column}`}
            row={row}
            column={column}
            isEmpty={true}
            isActive={true}
            isPromoted={false}
            color="blank"
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
          />
        );
      default:
        return null;
    }
  };

  const [board, setBoard] = useState<JSX.Element[][] | null>(null);

  const createBoardFromPattern = () => {
    //create board
    let board = new Array(pattern.length);

    //create rows
    let newRow = [];
    for (let row = 0; row < pattern.length; row++) {
      for (let column = 0; column < pattern[0].length; column++) {
        //fill row
        newRow.push(transformNumberToField(row, column, pattern[row][column]));
      }
      //add row to board and clear
      board.push(<tr key={row}>{newRow}</tr>);
      newRow = [];
    }

    setBoard(board);
  };

  useEffect(() => {
    createBoardFromPattern();
    // eslint-disable-next-line
  }, []);

  return (
    <table>
      <tbody>{board}</tbody>
    </table>
  );
};

export default Board;