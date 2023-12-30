import { useEffect } from "react";
import useGameState from './hooks/useGameState';
import useCardShuffler from './hooks/useCardShuffler';
import './App.css';
import Card from "./components/Card";
import Top from "./components/Top";
import Game from './components/Game';
import { simpleImages, advancedImages } from './gameLogic/cardImages.js';

function App() {
  const { 
    isGameStarted, setIsGameStarted,
    selectedCards, setSelectedCards,
    tries, setTries,
    isGameCleared, setIsGameCleared,
    currentTurn, setCurrentTurn,
    gameMode, setGameMode,
    isChecking, setIsChecking,
    isSoundEnabled, setIsSoundEnabled
  } = useGameState();

  const { cards, setCards, shuffleImages } = useCardShuffler(simpleImages, advancedImages);

  const matchSound = new Audio('/se/match.mp3');
  const mismatchSound = new Audio('/se/mismatch.mp3');
  const flipSound = new Audio('/se/card.mp3');

  const playSound = (sound) => {
    if (isSoundEnabled) {
      sound.play();
    }
  };

  const modeText = gameMode === 'simple' ? '初級' : '上級';

  const startGame = (mode) => {
    setGameMode(mode);
    setIsGameStarted(true);
    shuffleImages(mode);
  };

  const replayGame = async () => {
    await shuffleImages(gameMode);
    await shuffleImages(gameMode);
    setTries(0);
    setCurrentTurn(1);
    setIsGameCleared(false);
    setSelectedCards([]);
  };
  const resetGame = () => {
    setIsGameStarted(false);
    setTries(0);
    setCurrentTurn(1);
    setIsGameCleared(false);
    setGameMode(null);
    setSelectedCards([]);
  };

  const checkMatch = () => {
    if (selectedCards.length === 2) {
      setIsChecking(true);
      const firstCard = selectedCards[0];
      const secondCard = selectedCards[1];
      let matchFound = false;

      if (gameMode === 'simple') {
        matchFound = firstCard.num === secondCard.num;
      } else if (gameMode === 'advanced') {
        matchFound = firstCard.num === secondCard.num && firstCard.turn === currentTurn;
        if (matchFound) {
          setCurrentTurn(currentTurn + 1);
        }
      }
  
      if (matchFound) {
        let updatedCards = cards.map((card) => {
          if (card.num === firstCard.num) {
            return { ...card, isMatched: true };
          }
          return card;
        });
        setCards(updatedCards);
        setTimeout(() => {
          playSound(matchSound);
        }, 400);
      } else {
        setTimeout(() => {
          playSound(mismatchSound);
        }, 400);
      }
  
      setTries(prev => prev + 1);
      setTimeout(()=>{
        setSelectedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  const shareOnTwitter = () => {
    let modeText = gameMode === 'simple' ? "初級" : "上級";
    const text = `${modeText}モードを${tries}手でクリアしました！ https://winter-miniapp-2023-10a6b1683e30.herokuapp.com #新年START神経衰弱 #ミニアプリWeek`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  useEffect(() => {
    shuffleImages();
  }, []);

  useEffect(() => {
    if (selectedCards.length === 2){
      setTimeout(()=>{
        setSelectedCards([]);
      }, 1000);
      checkMatch();
    }
  }, [selectedCards]);

  useEffect(() => {
    if (cards.length === 0) return

    const allMatched = cards.every(card => card.isMatched);
    if (allMatched) {
      setIsGameCleared(true);
    }
  }, [cards]);

  return (
    <div className="container mx-auto max-w-7xl p-6 bg-white">
    {!isGameStarted ? (
      <Top 
      isSoundEnabled={isSoundEnabled} 
      setIsSoundEnabled={setIsSoundEnabled} 
      startGame={startGame} 
      />
      ) : (
      <Game
        modeText={modeText}
        cards={cards}
        isChecking={isChecking}
        selectedCards={selectedCards}
        setSelectedCards={setSelectedCards}
        playSound={playSound}
        flipSound={flipSound}
        gameMode={gameMode}
        replayGame={replayGame}
        resetGame={resetGame}
        tries={tries}
        isGameCleared={isGameCleared}
        shareOnTwitter={shareOnTwitter}
      />
      )}
    </div>
  );
}

export default App;