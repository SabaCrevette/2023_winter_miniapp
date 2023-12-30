import React from 'react';
import Footer from './Footer';

function Top({ isSoundEnabled, setIsSoundEnabled, startGame }) {
  return (
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
        <input type="checkbox"
          checked={isSoundEnabled}
          onChange={(e) => setIsSoundEnabled(e.target.checked)} />
        <svg className="swap-on w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>
        </svg>
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
    <Footer/>
    </section>
    );
  }
  
  export default Top;