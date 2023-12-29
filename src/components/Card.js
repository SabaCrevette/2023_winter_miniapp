import { useEffect, useState } from "react";

// isChecking プロパティを追加
const Card = ({ card, isChecking, selectedCards, setselectedCards, playSound }) => {
  const [isFlipped, setIsFlipped] = useState(false);  // isFlipped に名前を変更

  const handleClick = () => {
    // 既にマッチしている、選択済み、または判定中の場合は何もしない
    if (card.isMatched || selectedCards.includes(card) || isChecking) {
      return;
    }

    // カードをクリックした時の効果音を再生
    playSound();

    // カードを選択カードのリストに追加
    setselectedCards([...selectedCards, card]);
  };

  // カードのフリップ状態を更新する useEffect
  useEffect(() => {
    if(selectedCards[0] === card || selectedCards[1] === card || card.isMatched){
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  }, [selectedCards, card]);

  return (
    <div className={isFlipped ? "card open" : "card"} onClick={handleClick}>
      <div className="front">
        <img src={card.img} alt="" />
      </div>
      <div className="back">
        <img src="/img/saba.PNG" alt="" />
      </div>
    </div>
  );
}

export default Card;
