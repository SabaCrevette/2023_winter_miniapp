import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-center p-4 flex flex-col sm:flex-row justify-between items-center">
      <p>
        X: <a href="https://twitter.com/saba7678pg" target="_blank" rel="noopener noreferrer">@saba7678pg</a>
      </p>
      <p>
        <a href="https://forms.gle/yy45Ziqgh6Cn9oZA6" target="_blank" rel="noopener noreferrer">不具合報告・ご意見ご要望はこちら</a>
      </p>
    </footer>
  );
};

export default Footer;

// ---

// const Footer = () => {
// Footerアロー関数の定義

// target="_blank"
// リンクがクリックされたときに、リンク先のURLを新しいブラウザのタブで開くようにする。（現在のページは維持）
// rel="noopener noreferrer
// noopener：セキュリティリスクを減らす、新しいタブが元のタブのページに対してJavaScriptを実行することを防ぐ
// noreferrer：リンククリック時にリファラ情報を送信することを防ぐ。前にいたページのURLを含めず、プライバシーを守る