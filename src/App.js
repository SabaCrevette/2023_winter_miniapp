import { useEffect, useState } from "react";
import Card from "./components/Card";
import Footer from './components/Footer'; // Footerコンポーネントをインポート
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
  const [isSoundEnabled, setIsSoundEnabled] = useState(true); // 音声効果のオンオフ状態を管理する状態変数


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

  const shuffleImages = (mode) => {
    return new Promise((resolve) => {
      let imagesToUse = mode === 'simple' ? simpleImages : advancedImages;
      let shuffledImages = [...imagesToUse, ...imagesToUse]
        .map((item, index) => ({...item, id: index + 1}))
        .sort((a, b) => 0.5 - Math.random());
  
      setCards(shuffledImages);
      // 小さな遅延を追加して、状態が更新されるのを確実にします。
      setTimeout(() => resolve(), 100);
    });
  };

  // ゲームを再プレイする関数
  const replayGame = async () => {
    await shuffleImages(gameMode); // 1回目のシャッフル
    await shuffleImages(gameMode); // 2回目のシャッフル
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
        setselectedCards([]);
        setIsChecking(false);  // 判定終了
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl p-6 bg-white">
    {!isGameStarted ? (
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="aspect-w-16 aspect-h-9 w-full rounded overflow-hidden 2xl:w-1/2 2xl:mx-auto xl:w-1/2 xl:mx-auto lg:w-1/2 lg:mx-auto">
          <img className="w-full h-full object-cover rounded" alt="hero" src="/img/top.jpg" />
        </div>
          <div className="text-center lg:w-2/3 w-full">
            <br></br>
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">新年START神経衰弱</h1>
            <p className="mb-8 leading-relaxed">ルール説明</p>
            <p className="mb-8 leading-relaxed sm:whitespace-nowrap sm:overflow-hidden sm:text-overflow-ellipsis">
              初級：カードをめくって同じ絵を見つけてください
            </p>
            <p className="mb-8 leading-relaxed sm:whitespace-nowrap sm:overflow-hidden sm:text-overflow-ellipsis">
              上級：初級のルール＋STARTの順に揃えてください<br></br>（Tを揃える順番も指定されています）
            </p>

            <label className="swap swap-rotate mb-4">
              {/* 隠されたチェックボックスが状態を制御します */}
            <input type="checkbox"
              checked={isSoundEnabled}
              onChange={(e) => setIsSoundEnabled(e.target.checked)} />
  
            {/* 音声オンのアイコン */}
            <svg className="swap-on w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>
            </svg>
  
            {/* 音声オフのアイコン */}
            <svg className="swap-off w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"/>
            </svg>
            </label>

            <div className="flex justify-center">
              <button className="inline-flex text-white bg-blue-300 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg" onClick={() => startGame('simple')}>初級</button>
              <button className="ml-4 inline-flex text-gray-700 bg-yellow-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg" onClick={() => startGame('advanced')}>上級</button>
            </div>
          </div>
        </div>
        <Footer />
      </section>
      ) : (
      // ゲームが開始した場合の表示内容
      <div>
        <div className="start-screen">
          <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">新年START神経衰弱：{modeText}</h2>
        </div>
        <div className="cards-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
        <div className="flex flex-col md:flex-row justify-between mt-4">
          <button onClick={replayGame} className="text-black bg-blue-200 hover:bg-blue-300 py-2 px-4 rounded mb-4 md:mb-0">
            やり直す
          </button>
        <button onClick={resetGame} className="text-black bg-green-400 hover:bg-green-500 py-2 px-4 rounded">
          難易度選択へ戻る
        </button>
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