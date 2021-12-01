<<<<<<< HEAD
import Engine from './components/Engine';
=======
import { useSelector } from 'react-redux';
import Board from './components/Board';
>>>>>>> 4d142766a18fd913a9a2ae7d906c6f0bf31537c1

function App() {
  const isBlackTurn = useSelector((state: any) => state.checkers.isBlackTurn);
  return (
    <div className="App">
      <main className="main">
<<<<<<< HEAD
        <Engine />
=======
        <h1 className="header">
          Current move: {isBlackTurn ? 'Black' : 'Red'}
        </h1>
        <Board />
>>>>>>> 4d142766a18fd913a9a2ae7d906c6f0bf31537c1
      </main>
    </div>
  );
}

export default App;
