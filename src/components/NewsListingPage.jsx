import React, { useEffect, useState, useCallback } from "react";
import NewsCard from "./NewsCard";
import NewsSideBar from "./NewsSideBar";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import Skeleton from "./Skeleton";
import Pagination from "./Pagination";
import { FaRegNewspaper } from "react-icons/fa6";
import { HiOutlineBookmark } from "react-icons/hi2";

const categories = ["general", "business", "technology", "entertainment", "health", "science", "sports"];

const NewsListingPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("general");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [viewSaved, setViewSaved] = useState(false);
  const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('ym-news-save')) || []);

  const getNews = useCallback(async () => {
    if (viewSaved) return;

    const CACHE_KEY = `news-${category}-${query}-${page}`;
    const cachedData = localStorage.getItem(CACHE_KEY);

    if (cachedData) {
        const { timestamp, articles } = JSON.parse(cachedData);
        if (Date.now() - timestamp < 15 * 60 * 1000) {
            setNews(articles);
            return;
        }
    }

    setLoading(true);
    try {
      const key = import.meta.env.VITE_API_KEY;
      
      // SMART URL SWITCHER
      // Use proxy on Netlify, use direct GNews on localhost
      const baseUrl = window.location.hostname === 'localhost' 
        ? 'https://gnews.io/api/v4' 
        : '/gnews-api';

      const url = query 
        ? `${baseUrl}/search?q=${query}&lang=en&page=${page}&max=12&apikey=${key}`
        : `${baseUrl}/top-headlines?category=${category}&lang=en&page=${page}&max=12&apikey=${key}`;
      
      const res = await fetch(url);
      
      // Check if response is actually JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we didn't get JSON from the server!");
      }

      const data = await res.json();
      if (data.articles) {
        setNews(data.articles);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), articles: data.articles }));
      }
    } catch (e) { 
        console.error("GNews Error:", e); 
    } finally { 
        setLoading(false); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  }, [category, query, page, viewSaved]);

  useEffect(() => { getNews(); }, [getNews]);

  const handleBookmark = (article) => {
    const updated = bookmarks.some(b => b.url === article.url)
      ? bookmarks.filter(b => b.url !== article.url)
      : [...bookmarks, article];
    setBookmarks(updated);
    localStorage.setItem('ym-news-save', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen pb-10 transition-colors duration-500">
      <header className="glass-panel sticky top-0 z-[100] py-4 px-4 sm:px-6 border-none rounded-none shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-10">
          <div className="flex items-center cursor-pointer shrink-0 group" onClick={() => {setQuery(""); setViewSaved(false); setPage(1)}}>
             <div className="bg-brand p-3 rounded-2xl shadow-xl shadow-brand/40 group-hover:scale-110 transition-all">
                <FaRegNewspaper className="text-white text-xl sm:text-2xl" />
             </div>
          </div>
          <div className="flex-grow max-w-xl"><SearchBar onSearch={(q) => {setQuery(q); setViewSaved(false); setPage(1)}} /></div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
             <button onClick={() => setViewSaved(!viewSaved)} className={`p-3 rounded-2xl transition-all border-none cursor-pointer ${viewSaved ? 'bg-brand text-white shadow-lg' : 'glass-panel text-text-main'}`}>
                <HiOutlineBookmark size={22} />
             </button>
             <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-10">
        {!viewSaved && (
          <div className="flex gap-3 overflow-x-auto no-scrollbar mb-10 py-2">
            {categories.map(c => (
              <button key={c} onClick={() => {setCategory(c); setQuery(""); setPage(1)}} 
                className={`px-8 py-3 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all cursor-pointer border-none shrink-0 ${category === c && !query ? 'bg-brand text-white shadow-lg scale-105' : 'glass-panel text-text-sub hover:text-brand'}`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <h2 className="text-4xl sm:text-6xl font-black text-text-main mb-12 italic tracking-tighter uppercase border-l-8 border-brand pl-6">
            {viewSaved ? "Library" : query ? `Search: ${query}` : category}
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="w-full lg:w-3/4">
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                    {[1,2,3,4].map(n => <Skeleton key={n} />)}
                </div>
            ) : (
                <>
                    <NewsCard news={viewSaved ? bookmarks : news} bookmarks={bookmarks} onBookmark={handleBookmark} />
                    {!viewSaved && news.length > 0 && <Pagination current={page} onChange={setPage} />}
                </>
            )}
          </div>
          <div className="w-full lg:w-1/4"><NewsSideBar /></div>
        </div>
      </main>
    </div>
  );
};

export default NewsListingPage;