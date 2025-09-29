import React, { useState } from 'react';

function GuessingGame() {
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [history, setHistory] = useState([]);
  const [gameState, setGameState] = useState('playing');
  const [attemptsLeft, setAttemptsLeft] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [message, setMessage] = useState('');

  const getMaxNumber = () => {
    switch (difficulty) {
      case 'easy': return 50;
      case 'medium': return 100;
      case 'hard': return 200;
      default: return 100;
    }
  };

  const handleGuess = () => {
    const guessNumber = parseInt(guess);
    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > getMaxNumber()) {
      setMessage(`Vui lòng nhập số từ 1 đến ${getMaxNumber()}`);
      return;
    }

    const newHistory = [...history, guessNumber];
    setHistory(newHistory);
    setAttemptsLeft(attemptsLeft - 1);

    if (guessNumber === secretNumber) {
      setGameState('win');
      setMessage('Chúc mừng! Bạn đã đoán đúng!');
    } else if (attemptsLeft === 1) {
      setGameState('lose');
      setMessage(`Bạn đã thua! Số bí mật là ${secretNumber}.`);
    } else {
      const hint = guessNumber < secretNumber ? 'thấp hơn' : 'cao hơn'; // Sửa logic gợi ý
      setMessage(`Số bạn đoán ${hint} số bí mật.`);
    }
    setGuess('');
  };

  const handleReset = () => {
    setSecretNumber(Math.floor(Math.random() * getMaxNumber()) + 1);
    setGuess('');
    setHistory([]);
    setGameState('playing');
    setAttemptsLeft(10);
    setMessage('');
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    handleReset();
  };

  const getHistoryColor = (guess) => {
    const threshold = getMaxNumber() * 0.25; // 20%-30% range
    const difference = Math.abs(guess - secretNumber);
    return difference <= threshold ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Trò Chơi Đoán Số</h1>
      <div className="mb-4">
        <label className="mr-2">Chọn độ khó:</label>
        <select
          value={difficulty}
          onChange={(e) => handleDifficultyChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="easy">Dễ (1-50)</option>
          <option value="medium">Trung bình (1-100)</option>
          <option value="hard">Khó (1-200)</option>
        </select>
      </div>
      {gameState === 'playing' && (
        <div className="flex flex-col items-center mb-4">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="p-2 border rounded mb-2"
            placeholder={`Nhập số từ 1 đến ${getMaxNumber()}`}
          />
          <button
            onClick={handleGuess}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Đoán
          </button>
          <p className="mt-2">Lượt còn lại: {attemptsLeft}</p>
        </div>
      )}
      <p className="text-lg mb-4">{message}</p>
      {(gameState === 'win' || gameState === 'lose') && (
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Chơi lại
        </button>
      )}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Lịch sử đoán:</h2>
        <ul className="list-disc pl-5">
          {history.map((guess, index) => (
            <li key={index} className={getHistoryColor(guess)}>
              Lượt {history.length - index}: {guess}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GuessingGame;