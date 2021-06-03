import { useState, useEffect, useContext } from 'react';
import { BoardContext } from '../context/BoardContext';
import { FaChessPawn } from 'react-icons/fa';

const Field = ({ row, column }) => {
  const { board, setCurrent } = useContext(BoardContext);

  const [field, setField] = useState(board.getField(row, column));

  const getStyles = () => {
    let className = 'field ';

    if (field) {
      if (field.color) className += `field--${field.color} `;
      if (field.isActive) className += `field--active`;
    }

    return className;
  };

  const [className, setClassName] = useState(getStyles());

  const handleClick = () => {
    setCurrent({ row, column });
  };

  useEffect(() => {
    setField(board.getField(row, column));
  }, [board]);

  useEffect(() => {
    setClassName(getStyles());
  }, [field]);

  return (
    <td key={`${row}_${column}`} className={className} onClick={handleClick}>
      {!field.isEmpty ? <FaChessPawn /> : ' '}
    </td>
  );
};

export default Field;
