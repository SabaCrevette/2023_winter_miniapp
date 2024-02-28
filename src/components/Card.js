import { useEffect, useState } from "react";

const Card = ({ card, gameMode, isChecking, selectedCards, setSelectedCards, playSound }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const backImageSrc = gameMode === 'simple' ? "/img/saba.jpg" : "/img/1saba.jpg";

  // カードを選択中、めくりおわったカードなど、音が鳴って欲しくない場面で音を鳴らさないようにするための制御
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

// 以下復習メモ

// import { useEffect, useState } from "react";
// ReactからuseEffectとuseStateフックをインポート。
// それぞれ、副作用の実行・コンポーネントの状態管理に用いる。

// useStateが状態の変化を検知し、DOMの再レンダリングを行う。
// useEffectはDOMが更新された際に記載されたコードを副作用的に実行する。

// ---

// const Card = ({ card, gameMode, isChecking, selectedCards, setSelectedCards, playSound }) => {
// Cardコンポーネントの定義。card...playSoundと、propsを受け取る。

// const [isFlipped, setIsFlipped] = useState(false);
// カードが裏返されているかどうかを示す、初期値にfalse。
// isFlippedが状態変数（ここではfalse or true）、setIsFlippedは状態更新関数、変数を更新する際に使う。

// const backImageSrc = gameMode === 'simple' ? "/img/saba.jpg" : "/img/1saba.jpg";
// gameModeの値に応じて、裏面の画像（backImageSrc）を決定する。
// gameModeがsimpleならsaba.jpgを、そうでなければ1saba.jpegを使用する。

// ---

// const handleClick = () => {
// handleClickという名前の関数を定義（カードがクリックされた時の挙動）

// if (card.isMatched || selectedCards.includes(card) || isChecking) {
// card.isMatched：現在のカードがマッチしているか
// selectedCards.includes(card)：selectedCards.がすでに選択されたカードのリストに含まれているかどうか
// isChecking：現在、カードのマッチをチェック中かどうか
// return;
// 条件のいずれかがtrueであれば、関数の実行がここで停止し以降は実行されない

// playSound();
// カードがクリックされたときにサウンドを再生するための関数
// 

// setSelectedCards([...selectedCards, card]);
// selectedCards関数を利用してselectedCards状態の更新
// selectedCards配列に新たにクリックされたcardを追加。

// ---

// if(selectedCards[0] === card || selectedCards[1] === card || card.isMatched){
// selectedCards配列の最初の2つの要素が現在のcardと同じか、または、既に一致しているかどうか。
// つまり、カードが選択されているか、一致している状態か、を識別するための条件

// setIsFlipped(true);
// 上記の条件いずれかがtrueの場合、setIsFlipped関数を使用し、isFlipped状態をtrueに設定する。

// } else {
//   setIsFlipped(false);
// }
// もしくは上記条件に一致しない場合、isFlippedをfalseに設定。

// }, [selectedCards, card]);
// useEffectの依存配列部分、selectedCards配列、cardオブジェクトが変更された時のみ副作用が時以降れる。

// ---

// <div className={isFlipped ? "card open w-full h-auto" : "card w-full h-auto"} onClick={handleClick}>
// trueの場合、openクラスを適用
// onClickによりカードがクリックされたときにhandleClick関数が実行される

// <div className="front">
// <img src={card.img} alt="" className="object-cover w-full h-full" />
// </div>
// カードの表面の画像、CSSを定義

// <div className="back">
// <img src={backImageSrc} alt="" className="object-cover w-full h-full" />
// </div>
// カードの裏面の画像、CSSを定義