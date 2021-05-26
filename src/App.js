import Board from './components/Board';

function App() {
  const options = {
    boardSize: { X: 8, Y: 8 },
  };

  return (
    <div className="App">
      <main className="main">
        <Board {...options} />
      </main>
    </div>
  );
}

export default App;
