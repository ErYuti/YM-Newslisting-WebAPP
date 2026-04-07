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
    
    // Caching for Performance
    const CACHE_KEY = `news-${category}-${query}-${page}`;
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const { timestamp, articles } = JSON.parse(cached);
        if (Date.now() - timestamp < 15 * 60 * 1000) {
            setNews(articles);
            return;
        }
    }

    setLoading(true);
    try {
      const key = import.meta.env.VITE_API_KEY;
      const baseUrl = import.meta.env.VITE_API_URL;
      const url = query 
        ? `${baseUrl}/search?q=${query}&lang=en&page=${page}&max=12&apikey=${key}`
        : `${baseUrl}/top-headlines?category=${category}&lang=en&page=${page}&max=12&apikey=${key}`;
      
      const res = await fetch(url);
      const data = await res.json();
      if (data.articles) {
        setNews(data.articles);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), articles: data.articles }));
      }
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
    <div className="min-h-screen pb-10 transition-colors duration-500">
      {/* Header - Minimalist Design */}
      <header className="glass-panel sticky top-0 z-[100] py-4 px-4 sm:px-6 border-none rounded-none shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-10">
          
          {/* Logo Section - Text Removed as requested */}
          <div 
            className="flex items-center cursor-pointer shrink-0 group" 
            onClick={() => {setQuery(""); setViewSaved(false); setPage(1)}}
          >
             <div className="bg-brand p-3 rounded-2xl shadow-xl shadow-brand/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <FaRegNewspaper className="text-white text-xl sm:text-2xl" />
             </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-grow max-w-xl">
             <SearchBar onSearch={(q) => {setQuery(q); setViewSaved(false); setPage(1)}} />
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
             <button 
                onClick={() => setViewSaved(!viewSaved)} 
                className={`p-3 rounded-2xl transition-all border-none cursor-pointer hover:scale-105 active:scale-95 ${viewSaved ? 'bg-brand text-white shadow-brand/40 shadow-lg' : 'glass-panel text-text-main dark:bg-slate-800'}`}
                title="View Bookmarks"
             >
                <HiOutlineBookmark size={22} />
             </button>
             <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-10 sm:mt-16">
        
        {/* Category Pills - Perfectly Centered and Responsive */}
        {!viewSaved && (
          <div className="flex gap-3 overflow-x-auto no-scrollbar mb-12 py-2">
            {categories.map(c => (
              <button 
                key={c} 
                onClick={() => {setCategory(c); setQuery(""); setPage(1)}} 
                className={`px-8 py-3 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all cursor-pointer border-none shrink-0 whitespace-nowrap shadow-sm ${category === c && !query ? 'bg-brand text-white shadow-brand/30 scale-105' : 'glass-panel text-text-sub hover:text-brand dark:bg-slate-800'}`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* Dynamic Title */}
        <h2 className="text-4xl sm:text-6xl font-black text-text-main mb-12 sm:mb-20 italic tracking-tighter uppercase border-l-8 border-brand pl-6 sm:pl-8">
            {viewSaved ? "Saved stories" : query ? `Search: ${query}` : category}
        </h2>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Article Grid */}
          <div className="w-full lg:w-3/4">
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
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
                    
                    {/* Empty State for Bookmarks */}
                    {viewSaved && bookmarks.length === 0 && (
                      <div className="text-center py-40 glass-panel rounded-[3rem] border-dashed">
                        <HiOutlineBookmark className="mx-auto text-text-sub opacity-10 mb-6" size={100} />
                        <p className="text-text-sub font-black uppercase tracking-widest text-sm">Your reading list is empty</p>
                      </div>
                    )}
                </>
            )}
          </div>
          
          {/* Sidebar Area */}
          <div className="w-full lg:w-1/4">
            <NewsSideBar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsListingPage;