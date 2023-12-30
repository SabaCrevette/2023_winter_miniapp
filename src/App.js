import { useEffect, useState } from "react";
import useGameState from './hooks/useGameState'; // useGameStateをインポート

import Card from "./components/Card";
import Top from "./components/Top";
import Game from './components/Game'; // Game コンポーネントをインポート
import './App.css';
import { simpleImages, advancedImages } from './cardImages.js';
import useCardShuffler from './hooks/useCardShuffler';




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

  // useCardShufflerからcards, shuffleImages, そして setCards を受け取る
  const { cards, setCards, shuffleImages } = useCardShuffler(simpleImages, advancedImages);

  // 効果音のファイルパス
  const matchSound = new Audio('/se/match.mp3');
  const mismatchSound = new Audio('/se/mismatch.mp3');
  // カードをめくる効果音
  const flipSound = new Audio('/se/card.mp3');

  // 効果音を再生する関数
  const playSound = (sound) => {
    if (isSoundEnabled) {
      sound.play();
    }
  };

  // ゲームモードに応じたテキストを定義
  const modeText = gameMode === 'simple' ? '初級' : '上級';

  // ゲームを開始する関数
  const startGame = (mode) => {
    setGameMode(mode); // ゲームモードを設定
    setIsGameStarted(true);
    shuffleImages(mode);  // ゲーム開始時にカードをシャッフル
  };

  // ゲームを再プレイする関数
  const replayGame = async () => {
    await shuffleImages(gameMode); // 1回目のシャッフル
    await shuffleImages(gameMode); // 2回目のシャッフル
    setTries(0);
    setCurrentTurn(1);
    setIsGameCleared(false);
    setSelectedCards([]);
  };

  // ゲームをリセットしてタイトル画面に戻る関数
  const resetGame = () => {
    setIsGameStarted(false);
    setTries(0);
    setCurrentTurn(1);
    setIsGameCleared(false);
    setGameMode(null);
    setSelectedCards([]);
  };

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
      setIsGameCleared(true); // ゲームクリア状態をtrueにする
    }
  }, [cards]);

  // Twitterで共有するためのURLを生成する関数
  const shareOnTwitter = () => {
    let modeText = gameMode === 'simple' ? "初級" : "上級";
    const text = `${modeText}モードを${tries}手でクリアしました！ https://winter-miniapp-2023-10a6b1683e30.herokuapp.com #新年START神経衰弱 #ミニアプリWeek`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  const checkMatch = () => {
    if (selectedCards.length === 2) {
      setIsChecking(true);  // 判定開始
      const firstCard = selectedCards[0];
      const secondCard = selectedCards[1];
      let matchFound = false;

      if (gameMode === 'simple') {
        // 初級モードの一致条件
        matchFound = firstCard.num === secondCard.num;
      } else if (gameMode === 'advanced') {
        // 上級モードの一致条件
        matchFound = firstCard.num === secondCard.num && firstCard.turn === currentTurn;
        if (matchFound) {
          setCurrentTurn(currentTurn + 1); // ターンを進める
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
          playSound(matchSound); // 一致時の効果音を再生
        }, 400);  // 0.4秒遅延してから音を再生
      } else {
        setTimeout(() => {
          playSound(mismatchSound); // 不一致時の効果音を再生
        }, 400);  // 0.4秒遅延してから音を再生
      }
  
      setTries(prev => prev + 1);
      setTimeout(()=>{
        setSelectedCards([]);
        setIsChecking(false);  // 判定終了
      }, 1000);
    }
  };

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