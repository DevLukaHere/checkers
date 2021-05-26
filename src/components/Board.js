import { useState, useEffect } from 'react';
import Field from './Field';

const Board = ({ boardSize }) => {
  const [board, setBoard] = useState([
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
  ]);
  const [content, setContent] = useState(null);

  const [current, setCurrent] = useState(null);
  const [activeMoves, setActiveMoves] = useState([]);

  const handleClick = (x, y) => {
    setCurrent({ x, y });
  };

  const findMoves = () => {
    if (current) {
      const moves = [];
      const type = board[current.x][current.y];

      if (type === 1) {
        moves.push({
          fromX: current.x,
          fromY: current.y,
          toX: current.x - 1,
          toY: current.y + 1,
        });
        moves.push({
          fromX: current.x,
          fromY: current.y,
          toX: current.x - 1,
          toY: current.y - 1,
        });
      }
      if (type === 2) {
      }

      return moves;
    }

    return [];
  };

  const visualize = () => {
    let result = board.map((row, rowIndex) => (
      <tr key={rowIndex} id={`row_${rowIndex}`}>
        {row.map((item, columnIndex) => (
          <Field
            key={`${rowIndex}_${columnIndex}`}
            x={rowIndex}
            y={columnIndex}
            type={item}
            handleClick={handleClick}
          />
        ))}
      </tr>
    ));

    return result;
  };

  useEffect(() => {
    setContent(visualize());
    // eslint-disable-next-line
  }, [board]);

  useEffect(() => {
    setActiveMoves(findMoves());
    // eslint-disable-next-line
  }, [current]);

  useEffect(() => {
    const newBoard = board;
    activeMoves?.map((move) => {
      newBoard[move.toX][move.toY] = newBoard[move.toX][move.toY] + '*';
    });
    setBoard(newBoard);
    console.log(newBoard);
  }, [activeMoves]);

  return (
    <table>
      <tbody className="container">{content}</tbody>
    </table>
  );
};

export default Board;
