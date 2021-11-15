import { useSelector } from 'react-redux';
import Board from './components/Board';

function App() {
  const isBlackTurn = useSelector((state: any) => state.checkers.isBlackTurn);
  return (
    <div className="App">
      <main className="main">
        <h1 className="header">
          Current move: {isBlackTurn ? 'Black' : 'Red'}
        </h1>
        <Board />
      </main>
    </div>
  );
}

export default App;
