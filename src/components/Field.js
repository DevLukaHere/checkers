import { useState } from 'react';
import { FaChessPawn } from 'react-icons/fa';

const Field = ({ x, y, type, handleClick }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <td
      key={`${x}_${y}`}
      className={`field field--${type} ${isActive ? 'field--active' : ''}`}
      onClick={() => {
        handleClick(x, y);
        setIsActive(true);
      }}
    >
      {type ? <FaChessPawn /> : ' '}
    </td>
  );
};

export default Field;
