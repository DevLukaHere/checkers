import Board from './components/Board';
import BoardContextProvider from './context/BoardContext';

function App() {
  const options = {
    boardSize: { X: 8, Y: 8 },
  };

  return (
    <BoardContextProvider>
      <div className="App">
        <main className="main">
          <Board {...options} />
        </main>
      </div>
    </BoardContextProvider>
  );
}

export default App;
