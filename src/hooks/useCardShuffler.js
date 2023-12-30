import { useState } from 'react';

const useCardShuffler = (simpleImages, advancedImages) => {
  const [cards, setCards] = useState([]);

  const shuffleImages = (mode) => {
    let imagesToUse = mode === 'simple' ? simpleImages : advancedImages;
    let shuffledImages = [...imagesToUse, ...imagesToUse]
      .map((item, index) => ({...item, id: index + 1}))
      .sort(() => 0.5 - Math.random());
  
    setCards(shuffledImages);
  };

  return { cards, setCards, shuffleImages };
};

export default useCardShuffler;
