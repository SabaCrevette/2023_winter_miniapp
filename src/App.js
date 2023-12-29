import { useEffect, useState } from "react";
import Card from "./components/Card";
import './App.css';
import { simpleImages, advancedImages } from './cardImages.js';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false); // ゲーム開始状態の追加
  const [cards, setCards] = useState([]);
  const [selectedCards, setselectedCards] = useState([]);
  const [tries, setTries] = useState(0);
  const [isGameCleared, setIsGameCleared] = useState(false); // ゲームクリア状態を追加

  const [currentTurn, setCurrentTurn] = useState(1); // 現在のターン状態の追加
  const [gameMode, setGameMode] = useState(null); // 'simple' or 'advanced'
  const [isChecking, setIsChecking] = useState(false);  // 判定中ステートの追加

  // 効果音のファイルパス
  const matchSound = new Audio('/se/match.mp3');
  const mismatchSound = new Audio('/se/mismatch.mp3');
  // カードをめくる効果音
  const flipSound = new Audio('/se/card.mp3');

  // 効果音を再生する関数
  const playSound = (sound) => {
    sound.play();
  };

  // ゲームモードに応じたテキストを定義
  const modeText = gameMode === 'simple' ? '初級' : '上級';

  // ゲームを開始する関数
  const startGame = (mode) => {
    setGameMode(mode); // ゲームモードを設定
    setIsGameStarted(true);
    shuffleImages(mode);  // ゲーム開始時にカードをシャッフル
  };

  const shuffleImages = (mode) => {
    let imagesToUse = mode === 'simple' ? simpleImages : advancedImages;
    let shuffledImages = [...imagesToUse, ...imagesToUse]
      .map((item, index) => ({...item, id: index + 1}))
      .sort((a, b) => 0.5 - Math.random());

    setCards(shuffledImages);
  };

  // ゲームを再プレイする関数
  const replayGame = () => {
    shuffleImages(gameMode); // 現在のゲームモードでシャッフル
    setTries(0);
    setCurrentTurn(1);
    setIsGameCleared(false);
    setselectedCards([]);
  };

  // ゲームをリセットしてタイトル画面に戻る関数
  const resetGame = () => {
    setIsGameStarted(false);
    setTries(0);
    setCurrentTurn(1);
    setIsGameCleared(false);
    setGameMode(null);
    setselectedCards([]);
  };

  useEffect(() => {
    shuffleImages();
  }, []);

  useEffect(() => {
    if (selectedCards.length === 2){
      setTimeout(()=>{
        setselectedCards([]);
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
    const text = `${modeText}モードを${tries}手でクリアしました！ https://winter-miniapp-2023-10a6b1683e30.herokuapp.com #新年START神経衰弱`;
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
        setselectedCards([]);
        setIsChecking(false);  // 判定終了
      }, 1000);
    }
  };

  return (
    <div className="container">
      {!isGameStarted ? (
        <div className="start-screen">
          <h1>新年START神経衰弱</h1>
          <h4>ルール説明</h4>
          <p>初級：カードをめくって同じ絵を見つけてください</p>
          <p>
            上級：初級のルール＋STARTの順に揃えてください<br></br>
            （Tを揃える順番も指定されています）
          </p>
          {/* ゲームモード選択 */}
          <button onClick={() => startGame('simple')}>初級</button>
          <button onClick={() => startGame('advanced')}>上級</button>
        </div>
      ) : (
        // ゲームが開始した場合の表示内容
        <div>
          <div className="start-screen">
          <h1>新年START神経衰弱：{modeText}</h1>
          </div>
          <div className="cards-container">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                isChecking={isChecking}  // isCheckingをCardコンポーネントに渡す
                selectedCards={selectedCards}
                setselectedCards={setselectedCards}
                playSound={() => playSound(flipSound)}  // 効果音関数を渡す
                gameMode={gameMode}  // ゲームモードを渡す
              />
            ))}
          </div>
          <div className="tries-count">
            <h2>現在の手数: {tries}</h2>
          </div>
        {/* ゲームクリアメッセージと共有ボタンを条件付きで表示 */}
        {isGameCleared && (
        <div className="game-clear-message">
          <h2>{gameMode === 'simple' ? '初級' : '上級'}モードを<br></br>{tries}手でクリアしました！</h2>
          <button onClick={shareOnTwitter}>Xで共有する</button>
          <br></br>
          <br></br>
          {/* もう1度遊ぶボタン */}
          <button onClick={replayGame}>もう1度遊ぶ</button>
          {/* タイトルに戻るボタン */}
          <button onClick={resetGame}>タイトルに戻る</button>
        </div>
        )}
        </div>
      )}
    </div>
  );
}

export default App;