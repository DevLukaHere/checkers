import { useState, useEffect, useContext } from 'react';
import { BoardContext } from '../context/BoardContext';
import { FaChessPawn } from 'react-icons/fa';

import { TYPES } from '../context/BoardContext';

const Field = ({ x, y }) => {
  const { board, boardPUT, setCurrent } = useContext(BoardContext);

  const [field, setField] = useState(board[x][y]);

  const getStyles = () => {
    let className = 'field ';

    if (field) {
      className += `field--${field.color} `;
      if (field.isActive) className += `field--active`;
    }

    return className;
  };

  const [className, setClassName] = useState(getStyles());

  const handleClick = () => {
    setCurrent({ x, y });
  };

  const generateField = () => {
    setContent(
      <td key={`${x}_${y}`} className={className} onClick={handleClick}>
        {!field.isEmpty ? <FaChessPawn /> : ' '}
      </td>
    );
  };

  const [content, setContent] = useState(null);

  useEffect(() => {
    setClassName(getStyles());
    generateField();
  }, [board]);

  return <>{content}</>;
};

export default Field;
