import { useState, useEffect } from 'react';
import { FaChessPawn } from 'react-icons/fa';

const Board = ({ source, togglePawn }) => {
  const [visualisation, setVisualisation] = useState(null);

  const getElements = () => {
    return source.table.map((row, rowIndex) => (
      <tr key={rowIndex} className={`row row_${rowIndex}`}>
        {row.map((field, columnIndex) =>
          translate(field, rowIndex, columnIndex)
        )}
      </tr>
    ));
  };

  const translate = (field, rowIndex, columnIndex) => {
    let content = null;

    if (field) {
      content = <FaChessPawn />;
    } else {
      content = ' ';
    }

    return (
      <td
        key={`${rowIndex}_${columnIndex}`}
        className={`field ${field ? `field--${field.player}` : ''} `}
        onClick={() => togglePawn(rowIndex, columnIndex)}
      >
        {content}
      </td>
    );
  };

  useEffect(
    () => {
      setVisualisation(getElements(source));
    },
    // eslint-disable-next-line
    [source]
  );

  return (
    <table>
      <tbody className="container">{visualisation}</tbody>
    </table>
  );
};

export default Board;
