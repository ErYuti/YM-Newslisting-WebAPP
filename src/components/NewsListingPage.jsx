import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import NewsSideBar from "./NewsSideBar";
import SearchBar from "./SearchBar";

const NewsListingPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const defaultQuery = "technology";

  const newsApi = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/everything?q=${query}&apiKey=${import.meta.env.VITE_API_KEY}`);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      let newsData = data.articles;
      // Sort articles by published date (you can adjust sorting criteria as needed)
      newsData.sort((a, b) => {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      });
      setNews(newsData);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]); // Clear news if there's an error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    newsApi(defaultQuery);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <header className="bg-black text-white p-10">
        <nav className="px-20">
          <h1 className="pb-10 lg:text-3xl lg:font-bold md:text-2xl">
            <span className="text-red-600">YM</span>NewsPage
          </h1>
          <SearchBar onSearch={newsApi} />
        </nav>
      </header>

      <div className="flex flex-col lg:flex-row gap-10 px-20 py-10">
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <NewsCard news={news} />
        )}
        <div>
          <NewsSideBar />
        </div>
      </div>
    </>
  );
};

export default NewsListingPage;
