// カードの状態や設定、ゲーム情報等ゲームの進行状況を提供するための処理をまとめたファイル
import React from 'react';  // Reactライブラリをインポート
import Card from "./Card";  // Cardコンポーネントをインポート

// Gameコンポーネントを定義
const Game = ({
    modeText,
    cards,
    isChecking,
    selectedCards,
    setSelectedCards,
    playSound,
    flipSound,
    gameMode,
    replayGame,
    resetGame,
    tries,
    isGameCleared,
    shareOnTwitter
}) => {
    return (
        <div>
            <div className="start-screen">
                <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">新年START神経衰弱：{modeText}</h2>
            </div>
            <div className="cards-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {cards.map((card) => (
                    // 各Cardに対して、Cardコンポーネントをレンダリング。
                    // それぞれに必要なプロパティを渡す。
                    <Card
                        key={card.id}
                        card={card}
                        isChecking={isChecking}
                        selectedCards={selectedCards}
                        setSelectedCards={setSelectedCards}
                        playSound={() => playSound(flipSound)}
                        gameMode={gameMode}
                    />
                ))}
            </div>
            <div className="flex flex-col md:flex-row justify-between mt-4">
                <button onClick={replayGame} className="text-black bg-blue-200 hover:bg-blue-300 py-2 px-4 rounded mb-4 md:mb-0">やり直す</button>
                <button onClick={resetGame} className="text-black bg-green-400 hover:bg-green-500 py-2 px-4 rounded">タイトルに戻る</button>
            </div>
            <div className="tries-count">
                <h2>現在の手数: {tries}</h2>
            </div>
            {isGameCleared && (
                <div className="game-clear-message">
                    <h2>{modeText}モードを<br></br>{tries}手でクリアしました！</h2>
                    <button onClick={shareOnTwitter}>Xで共有する</button>
                    <br></br><br></br>
                    <button onClick={replayGame}>もう1度遊ぶ</button>
                    <button onClick={resetGame}>タイトルに戻る</button>
                </div>
            )}
        </div>
    );
};

export default Game;
