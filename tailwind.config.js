/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // すべてのJS/TSファイルに対応
    "./public/index.html", // publicディレクトリ下のHTMLファイル
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

