import React from 'react';
import NewsListingPage from './components/NewsListingPage';

function App() {
  return (
    <div>
      <NewsListingPage />
      <footer className="text-center bg-black text-white p-5">
        <h2 className="text-3xl font-bold"><span className="text-red-600">YM</span>NewsPage</h2>
        <p>All Rights Reserved &copy;2024. Designed By yutiMeher</p>
      </footer>
    </div>
  );
}

export default App;
