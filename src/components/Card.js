import { useEffect, useState } from "react";

const Card = ({ card, gameMode, isChecking, selectedCards, setSelectedCards, playSound }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const backImageSrc = gameMode === 'simple' ? "/img/saba.jpg" : "/img/1saba.jpg";

  const handleClick = () => {
    if (card.isMatched || selectedCards.includes(card) || isChecking) {
      return;
    }
    playSound();
    setSelectedCards([...selectedCards, card]);
  };

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
