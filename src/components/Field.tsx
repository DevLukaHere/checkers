import { useState, useEffect, useContext } from 'react';
import { FaChessPawn } from 'react-icons/fa';

export type FieldProps = {
  row: number;
  column: number;
  isEmpty: boolean;
  isActive: boolean;
  isPromoted: boolean;
  color: string;
};

const Field = ({
  row,
  column,
  isEmpty,
  isActive,
  isPromoted,
  color,
}: FieldProps) => {
  //const { board, boardACTIVE, setCurrent } = useContext(BoardContext);

  //const [field, setField] = useState(board[x][y]);

  const getStyles = () => {
    let className = 'field ';

    if (color) className += `field--${color}`;
    if (isActive) className += ` field--active`;

    return className;
  };

  const [className, setClassName] = useState(getStyles());

  // const handleClick = () => {
  //   setCurrent({ row, column });
  // };

  const generateField = () => {
    setContent(
      <td key={`${row}_${column}`} className={className}>
        {!isEmpty ? <FaChessPawn /> : ' '}
      </td>
    );
  };

  const [content, setContent] = useState<JSX.Element | null>(null);

  // useEffect(() => {
  //   setField(board[x][y]);
  // }, [board]);

  // useEffect(() => {
  //   setClassName(getStyles());
  // }, [field]);

  useEffect(() => {
    generateField();
  }, [className]);

  return <>{content}</>;
};

export default Field;
