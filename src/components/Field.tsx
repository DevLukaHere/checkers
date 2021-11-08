import { useState, useEffect } from 'react';
import { FaChessPawn } from 'react-icons/fa';

export type FieldProps = {
  row: number;
  column: number;
  isEmpty: boolean;
  isActive: boolean;
  isPromoted: boolean;
  color: string;
  setActive: () => void;
};

const Field = ({
  row,
  column,
  isEmpty,
  isActive,
  isPromoted,
  color,
  setActive,
}: FieldProps) => {
  const [content, setContent] = useState<JSX.Element | null>(null);

  const createField = () => {
    let className = 'field ';

    if (color) className += `field--${color}`;
    if (isActive) className += ` field--active`;

    setContent(
      <td key={`${row}_${column}`} className={className} onClick={setActive}>
        {!isEmpty ? <FaChessPawn /> : ' '}
      </td>
    );
  };

  useEffect(() => {
    createField();
    // eslint-disable-next-line
  }, [isActive, isEmpty]);

  return <>{content}</>;
};

export default Field;
