import { useState, useEffect, useContext } from 'react';
import Field from './Field';
import { BoardContext } from '../context/BoardContext';

const Board = () => {
  const { board } = useContext(BoardContext);

  const [content, setContent] = useState(null);

  const transformBoard = () => {
    let transformedBoard = board.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((type, columnIndex) => (
          <Field
            key={`${rowIndex}_${columnIndex}`}
            x={rowIndex}
            y={columnIndex}
          />
        ))}
      </tr>
    ));

    setContent(transformedBoard);
  };

  //display transformed array
  useEffect(() => {
    transformBoard();
    // eslint-disable-next-line
  }, [board]);

  return (
    <table>
      <tbody className="container">{content}</tbody>
    </table>
  );
};

export default Board;
