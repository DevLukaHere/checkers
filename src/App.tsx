import Board from './components/Board';

export enum fieldType {
  BLANK,
  CHECKED,
  BLACK_PAWN,
  BLACK_PAWN_CHECKED,
  RED_PAWN,
  RED_PAWN_CHECKED,
}

function App() {
  const initialPattern: number[][] = [
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 0, 4, 0, 4, 0, 4],
    [4, 0, 4, 0, 4, 0, 4, 0],
    [0, 4, 0, 4, 0, 4, 0, 4],
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
