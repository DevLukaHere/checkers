import { useState, useEffect } from 'react';
import Board from './components/Board';
import _board from './models/_board';
import _pawn from './models/_pawn';

function App() {
  const boardSize = { X: 8, Y: 8 };
  const pawnsRowsAmount = 3;

  const generateBoard = () => {
    const newBoard = new _board(boardSize.X, boardSize.Y);
    let id = 1;

    //generate second player pawns
    for (let row = 0; row < pawnsRowsAmount; row++) {
      for (let column = row % 2; column < boardSize.Y; column = column + 2) {
        newBoard.put(new _pawn(id, 'second', 'pawn', row, column, newBoard));
        id++;
      }
    }

    //generate first player pawns
    for (let row = boardSize.Y - pawnsRowsAmount; row < boardSize.Y; row++) {
      for (let column = row % 2; column < boardSize.Y; column = column + 2) {
        newBoard.put(new _pawn(id, 'first', 'pawn', row, column, newBoard));
        id++;
      }
    }

    return newBoard;
  };

  const [board, setBoard] = useState(generateBoard());
  const [moves, setMoves] = useState([]);

  const [active, setActive] = useState(null);

  const toggleActive = (x, y) => {
    setActive({ X: x, Y: y });
  };

  const getMoves = (pown) => {
    console.log('Wszystkie ruchy: ', pown.getMoves());
    setMoves(pown.getMoves());
  };

  useEffect(() => {
    if (active) {
      //console.log(active);
      console.log(board.getPawn(active.X, active.Y));
      getMoves(board.getPawn(active.X, active.Y));
    }
  }, [active]);
  return (
    <div className="App">
      <main className="main">
        <Board source={board} toggleActive={toggleActive} moves={moves} />
      </main>
    </div>
  );
}

export default App;
