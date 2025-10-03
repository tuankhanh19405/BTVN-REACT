import { useState } from 'react';

function Cart() {
  const initializeCards = () => {
    const cards = Array(12).fill().map((_, i) => ({ id: i, isFlipped: false }));
    cards[Math.floor(Math.random() * 12)].isLucky = true;
    return cards;
  };

  const [cards, setCards] = useState(initializeCards());
  const [turns, setTurns] = useState(3);
  const [gameOver, setGameOver] = useState(null);

  const handleFlip = (id) => {
    if (turns <= 0 || gameOver) return;

    const newCards = cards.map((card) =>
      card.id === id && !card.isFlipped ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const flippedCard = newCards.find((card) => card.id === id);
    if (flippedCard.isLucky) {
      setGameOver('win');
    } else {
      setTurns(turns - 1);
      if (turns === 1) setGameOver('lose');
    }
  };

  const resetGame = () => {
    setCards(initializeCards());
    setTurns(3);
    setGameOver(null);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Lật Bài May Mắn</h1>
      <p className="mb-2">Lượt: {turns}</p>
      {gameOver && (
        <p className="text-xl mb-2">{gameOver === 'win' ? 'Thắng! 🎉' : 'Thua! 😔'}</p>
      )}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`w-20 h-28 rounded-md cursor-pointer transition-transform duration-300 transform ${
              card.isFlipped ? 'rotate-y-180 bg-white' : 'bg-gray-400'
            } ${card.isFlipped && card.isLucky ? 'bg-yellow-300' : ''}`}
            onClick={() => handleFlip(card.id)}
            style={{ perspective: '1000px' }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div
                className={`absolute w-full h-full flex items-center justify-center text-xl ${
                  card.isFlipped ? 'hidden' : 'block'
                } bg-gray-400 rounded-md`}
              >
                ?
              </div>
              <div
                className={`absolute w-full h-full flex items-center justify-center text-xl ${
                  card.isFlipped ? 'block' : 'hidden'
                }`}
              >
                {card.isLucky ? '⭐' : '☐'}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Chơi lại
      </button>
    </div>
  );
}

export default Cart;