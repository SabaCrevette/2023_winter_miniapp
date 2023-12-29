import { useEffect, useState } from "react";

const Card = ({ card, selectedCards, setselectedCards}) => {
  const [isFripped, setIsFripped] = useState(false);

  const handleClick = () => {
  // カードがすでにマッチしているか、すでに選択されている場合は何もしない
  if (card.isMatched || selectedCards.includes(card)) {
    return;
  }

  // それ以外の場合は、カードを選択カードのリストに追加
  setselectedCards([...selectedCards, card]);
}

  useEffect((()=> {
    if(selectedCards[0] === card || selectedCards[1] === card || card.isMatched){
      setIsFripped(true);
    } else {
      setIsFripped(false);
    }
  }), [selectedCards])
  return (
    <div className={isFripped ? "card open" : "card"} onClick={handleClick}>
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
