import Board from './components/Board';

export enum fieldType {
  BLANK,
  BLACK_PAWN,
  RED_PAWN,
  BLACK_PAWN_CHECKED,
  RED_PAWN_CHECKED,
}

function App() {
  const initialPattern: number[][] = [
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
  ];
  return (
    <div className="App">
      <main className="main">
        <Board initialPattern={initialPattern} />
      </main>
    </div>
  );
}

export default App;
