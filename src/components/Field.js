import { useState, useEffect, useContext } from 'react';
import { BoardContext } from '../context/BoardContext';
import { FaChessPawn } from 'react-icons/fa';

import { TYPES } from '../context/BoardContext';

const Field = ({ x, y }) => {
  const { board, boardPUT, setCurrent } = useContext(BoardContext);

  const [type, setType] = useState(board[x][y]);

  const createClassName = (type) => `field field--${type}`;

  const [className, setClassName] = useState(createClassName(board[x][y]));

  const handleClick = () => {
    let checked = null;
    if (type === TYPES.BLANK) checked = TYPES.CHECKED;
    if (type === TYPES.BLACK_PAWN) checked = TYPES.BLACK_PAWN_CHECKED;
    if (type === TYPES.RED_PAWN) checked = TYPES.RED_PAWN_CHECKED;

    boardPUT(x, y, checked);
    setType(checked);

    setCurrent({ x, y });
  };

  const generateField = () => {
    const field = (
      <td key={`${x}_${y}`} className={className} onClick={handleClick}>
        {/* {x + '_' + y} */}
        {type !== TYPES.BLANK && type !== TYPES.CHECKED ? <FaChessPawn /> : ' '}
      </td>
    );

    setContent(field);
  };

  const [content, setContent] = useState(null);

  useEffect(() => {
    setType(board[x][y]);
    setClassName(createClassName(board[x][y]));
    generateField();
  }, [board]);

  useEffect(() => {
    generateField();
  }, [type]);

  return <>{content}</>;
};

export default Field;
