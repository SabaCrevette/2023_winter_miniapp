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

// const useCardShuffler = (simpleImages, advancedImages) => {
// useCardShuffler、カスタムフック。（useStateやuseEffectはReactの組み込みフック）
// simpleImagesとadvancedImagesの2つの引数を受け取る。
// const [cards, setCards] = useState([]);
// cardsという状態変数と、その状態を更新するための関数setCardsをuseStateにより初期化。

// const shuffleImages = (mode) => {
// shuffleImages関数の定義、modeを引数として受け取る
// let imagesToUse = mode === 'simple' ? simpleImages : advancedImages;
// gamemodeがsimpleならsimpleImagesを使用
// let shuffledImages = [...imagesToUse, ...imagesToUse]
// 選択された画像配列を２組作り、新しい配列とする。
//       .map((item, index) => ({...item, id: index + 1}))
// 展開した配列の各要素（item）に対してmap関数を使用し、新しいオブジェクトを作成。
// 新しいオブジェクトに、元のitemのプロパティと一意のidプロパティを含む。
//       .sort(() => 0.5 - Math.random());
// 配列に対してランダムに並び替え。
//     setCards(shuffledImages);
// setCards関数でcards状態をランダムにシャッフルされた画像配列に更新する。
//   return { cards, setCards, shuffleImages };
// cards状態、setCards更新関数、shuffleImagesシャッフル関数を返す。

// .map((item, index) => ({...item, id: index + 1}))
// .sort(() => 0.5 - Math.random());

// index + 1を使っているのはindexが0から始まるため。
// [
//   { img: "img1.png", id: 1 },
//   { img: "img2.png", id: 2 },
//   { img: "img1.png", id: 3 },
//   { img: "img2.png", id: 4 }
// ]

// Math.random()で0から1までのランダムな数値を返す
// ここから0.5を引くと、- 0.5　〜　0.5の範囲になる。
// sortメソッドにより、前後の要素が比較され、正の結果であれば順序を変更する。