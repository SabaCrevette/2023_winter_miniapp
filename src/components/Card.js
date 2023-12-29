import { useEffect, useState } from "react";

// isChecking プロパティを追加
const Card = ({ card, gameMode, isChecking, selectedCards, setselectedCards, playSound }) => {
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

  // ゲームモードに応じた画像ソースを設定
  const backImageSrc = gameMode === 'simple' ? "/img/saba.jpg" : "/img/1saba.jpg";

  // カードのフリップ状態を更新する useEffect
  useEffect(() => {
    if(selectedCards[0] === card || selectedCards[1] === card || card.isMatched){
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  }, [selectedCards, card]);

  return (
    <div className={isFlipped ? "card open w-full h-auto" : "card w-full h-auto"} onClick={handleClick}>
      <div className="front">
        <img src={card.img} alt="" className="object-cover w-full h-full" />
      </div>
      <div className="back">
        <img src={backImageSrc} alt="" className="object-cover w-full h-full" />
      </div>
    </div>
  );
}

export default Card;
