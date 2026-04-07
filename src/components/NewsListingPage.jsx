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
    setLoading(true);
    try {
      const key = import.meta.env.VITE_API_KEY;
      const url = query 
        ? `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=10&apiKey=${key}`
        : `https://newsapi.org/v2/top-headlines?category=${category}&page=${page}&pageSize=10&country=us&apiKey=${key}`;
      
      const res = await fetch(url);
      const data = await res.json();
      setNews(data.articles || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }
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
    <div className="min-h-screen pb-20 transition-colors duration-500">
      <header className="glass-panel sticky top-0 z-[100] py-4 px-6 border-none rounded-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => {setQuery(""); setViewSaved(false); setPage(1)}}>
             <div className="bg-brand p-2.5 rounded-2xl rotate-6 shadow-lg shadow-brand/40"><FaRegNewspaper className="text-white text-xl" /></div>
             <h1 className="text-2xl font-black text-text-main italic tracking-tighter hidden md:block">YM<span className="text-brand">NEWS</span></h1>
          </div>
          
          <div className="flex-grow max-w-xl"><SearchBar onSearch={(q) => {setQuery(q); setViewSaved(false); setPage(1)}} /></div>
          
          <div className="flex items-center gap-3">
             <button onClick={() => setViewSaved(!viewSaved)} className={`p-3 rounded-2xl transition-all ${viewSaved ? 'bg-brand text-white shadow-lg shadow-brand/40' : 'glass-panel text-text-main'}`}>
                <HiOutlineBookmark size={24} />
             </button>
             <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        {!viewSaved && (
          <div className="flex gap-3 overflow-x-auto no-scrollbar mb-12">
            {categories.map(c => (
              <button key={c} onClick={() => {setCategory(c); setQuery(""); setPage(1)}} className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${category === c && !query ? 'bg-brand text-white scale-105' : 'glass-panel text-text-sub hover:text-brand'}`}>
                {c}
              </button>
            ))}
          </div>
        )}

        <h2 className="text-5xl font-black text-text-main mb-12 italic tracking-tighter uppercase border-l-8 border-brand pl-6">
            {viewSaved ? "Saved Stories" : query ? `Search: ${query}` : category}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[1,2,3,4].map(n => <Skeleton key={n} />)}
                </div>
            ) : (
                <>
                    <NewsCard 
                      news={viewSaved ? bookmarks : news} 
                      bookmarks={bookmarks} 
                      onBookmark={handleBookmark} 
                    />
                    {!viewSaved && news.length > 0 && <Pagination current={page} onChange={setPage} />}
                </>
            )}
            {viewSaved && bookmarks.length === 0 && (
              <div className="text-center py-40 glass-panel rounded-[3rem]">
                <HiOutlineBookmark className="mx-auto text-text-sub opacity-20 mb-4" size={80} />
                <p className="text-text-sub font-black uppercase tracking-widest">Library is empty</p>
              </div>
            )}
          </div>
          <div className="lg:col-span-1 hidden lg:block"><NewsSideBar /></div>
        </div>
      </main>
    </div>
  );
};

export default NewsListingPage;