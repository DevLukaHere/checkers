import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaChessPawn } from 'react-icons/fa';

export type FieldProps = {
  row: number;
  column: number;
  isEmpty: boolean;
  isActive: boolean;
  isPromoted: boolean;
  color: string;
  handleClick: () => void;
};

const Field = ({
  row,
  column,
  isEmpty,
  isActive,
  isPromoted,
  color,
  handleClick,
}: FieldProps) => {
  const checkers = useSelector((state: any) => state.checkers);
  const [content, setContent] = useState<JSX.Element | null>(null);

  const createField = () => {
    let className = 'field ';

    if (color) className += `field--${color}`;
    if (isActive) className += ` field--active`;

    setContent(
      <td key={`${row}_${column}`} className={className} onClick={handleClick}>
        {<p className="fieldID">{`${row}_${column}`}</p>}
        {!isEmpty ? <FaChessPawn /> : ' '}
      </td>
    );
  };

  useEffect(() => {
    createField();
    // eslint-disable-next-line
  }, [isActive, isEmpty, checkers]);

  return <>{content}</>;
};

export default Field;
