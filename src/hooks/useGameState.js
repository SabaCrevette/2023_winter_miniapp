// hooks/useGameState.js
import { useState } from 'react';

const useGameState = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [tries, setTries] = useState(0);
  const [isGameCleared, setIsGameCleared] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [gameMode, setGameMode] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // ゲームの状態をリセットする関数など、必要に応じて他の関数を追加します。
  
  return {
    isGameStarted, setIsGameStarted,
    selectedCards, setSelectedCards,
    tries, setTries,
    isGameCleared, setIsGameCleared,
    currentTurn, setCurrentTurn,
    gameMode, setGameMode,
    isChecking, setIsChecking,
    isSoundEnabled, setIsSoundEnabled,
    // ...その他の状態管理関数
  };
};

export default useGameState;
