import { useEffect, useState } from "react";
import Card from "./components/Card";
import './App.css';

function App() {
  let images = [
    {
      num: 1, // numberはペアを識別するために使う
      img: "./img/S.PNG",
      isMatched: false
    },
    {
      num: 2,
      img: "./img/T.PNG",
      isMatched: false
    },
    {
      num: 3,
      img: "./img/A.PNG",
      isMatched: false
    },
    {
      num: 4,
      img: "./img/R.PNG",
      isMatched: false
    },
    {
      num: 5,
      img: "./img/T2.PNG",
      isMatched: false
    },
  ]

  const [cards, setCards] = useState([]);
  const [selectedCards, setselectedCards] = useState([]);
  const [tries, setTries] = useState(0);
  const [isGameCleared, setIsGameCleared] = useState(false); // ゲームクリア状態を追加

  const shuffleImages = () => {
    let shuffledImages = [...images, ...images]
      .map((item, index) => ({...item, id: index + 1}))
      .sort((a, b) => 0.5 - Math.random());

    setCards(shuffledImages);
  }

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
    const text = `${tries}手でクリアしました！ #新年START神経衰弱`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  const checkMatch = () => {
    let matchFound = selectedCards[0].num === selectedCards[1].num;
  
    if (matchFound) {
      let updatedCards = cards.map((card) => {
        if (card.num === selectedCards[0].num){
          return { ...card, isMatched: true}
        }
        return card;
      });
      setCards(updatedCards);
    }
  
    // 一致してもしていなくてもtriesをインクリメント
    setTries(prev => prev + 1);
  }

  return (
    <div className="container">
      <div className="cards-container">
        {cards.map((card)=>(
          <Card
            key={card.id}
            card={card}
            selectedCards={selectedCards}
            setselectedCards={setselectedCards}
          />
        ))}
      </div>
      <div className="tries-count">
        <h2>現在の手数: {tries}</h2>
      </div>
      {/* ゲームクリアメッセージと共有ボタンを条件付きで表示 */}
      {isGameCleared && (
        <div className="game-clear-message">
          <h2>{tries}手でクリアしました！</h2>
          <button onClick={shareOnTwitter}>Xで共有する</button>
        </div>
      )}

      {/* カードコンテナなど他の要素 */}
      {/* ... */}
    </div>
    
  );
}

export default App;