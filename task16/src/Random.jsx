import { useState } from 'react';

function Random() {
  const [numPlayers, setNumPlayers] = useState(0);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [setupMode, setSetupMode] = useState(true);

  const startGame = () => {
    if (numPlayers < 1 || numPlayers > 6) return;
    const newPlayers = Array.from({ length: numPlayers }, (_, i) => ({
      id: i,
      name: `Người chơi ${i + 1}`,
      position: 0,
      history: [],
    }));
    setPlayers(newPlayers);
    setSetupMode(false);
    setGameOver(false);
  };

  const rollDice = () => {
    if (gameOver || setupMode) return;
    const roll = Math.floor(Math.random() * 6) + 1;
    const currentPlayer = players[currentPlayerIndex];
    const newPosition = Math.min(currentPlayer.position + roll, 30);
    const newHistory = [...currentPlayer.history, roll];

    setPlayers((prev) =>
      prev.map((p, idx) =>
        idx === currentPlayerIndex
          ? { ...p, position: newPosition, history: newHistory }
          : p
      )
    );

    if (newPosition >= 30) {
      setGameOver(true);
      return;
    }

    if (roll === 6) {
      // Tung tiếp
      return;
    } else {
      // Chuyển lượt
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    }
  };

  const resetGame = () => {
    setNumPlayers(0);
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setGameOver(false);
    setSetupMode(true);
  };

  const updatePlayerName = (id, name) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  if (setupMode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Cuộc Đua Xúc Xắc</h1>
        <div className="mb-4">
          <label className="block mb-2">Số lượng người chơi (1-6):</label>
          <input
            type="number"
            min="1"
            max="6"
            value={numPlayers}
            onChange={(e) => setNumPlayers(Number(e.target.value))}
            className="border p-2 rounded w-20"
          />
        </div>
        {numPlayers > 0 && (
          <div className="mb-4">
            {Array.from({ length: numPlayers }, (_, i) => (
              <div key={i} className="mb-2">
                <label>Tên người chơi {i + 1}:</label>
                <input
                  type="text"
                  defaultValue={`Người chơi ${i + 1}`}
                  onBlur={(e) => updatePlayerName(i, e.target.value || `Người chơi ${i + 1}`)}
                  className="border p-2 rounded ml-2"
                />
              </div>
            ))}
          </div>
        )}
        <button
          onClick={startGame}
          disabled={numPlayers < 1 || numPlayers > 6}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          Bắt đầu
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Cuộc Đua Xúc Xắc</h1>
      
      {/* Bảng vị trí */}
      <div className="mb-4 w-full max-w-md">
        <div className="flex justify-between mb-2">
          {players.map((p) => (
            <div key={p.id} className="text-center">
              <div className="font-bold">{p.name}</div>
              <div>Vị trí: {p.position}</div>
            </div>
          ))}
        </div>
        <div className="relative h-8 bg-gray-200 rounded">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-8 border-l border-gray-400 ${i % 5 === 0 ? 'border-black' : ''}`}
              style={{ left: `${(i / 29) * 100}%` }}
            />
          ))}
          {players.map((p) => (
            <div
              key={p.id}
              className="absolute h-full w-2 bg-blue-500"
              style={{ left: `${(p.position / 30) * 100}%`, top: 0 }}
            />
          ))}
        </div>
      </div>

      {/* Lượt hiện tại và nút roll */}
      <div className="mb-4 text-center">
        <p className="text-xl mb-2">Lượt: {players[currentPlayerIndex].name}</p>
        <button
          onClick={rollDice}
          disabled={gameOver}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 text-xl"
        >
          Tung xúc xắc
        </button>
      </div>

      {/* Kết quả */}
      {gameOver && (
        <p className="text-2xl font-bold mb-4 text-green-600">
          {players[currentPlayerIndex].name} thắng! 🎉
        </p>
      )}

      {/* Lịch sử */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Lịch sử tung xúc xắc</h2>
        {players.map((p) => (
          <div key={p.id} className="mb-2">
            <h3 className="font-semibold">{p.name}:</h3>
            <div className="flex flex-wrap gap-1">
              {p.history.map((roll, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-200 rounded text-sm">{roll}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Chơi lại
      </button>
    </div>
  );
}

export default Random;