import React, { useEffect, useState } from 'react';
import { HiFire } from "react-icons/hi2";

const NewsSideBar = () => {
    const [top, setTop] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            const CACHE_KEY = 'ym-trending-cache';
            const cached = localStorage.getItem(CACHE_KEY);

            // Check Cache (30 Minutes)
            if (cached) {
                const { timestamp, articles } = JSON.parse(cached);
                if (Date.now() - timestamp < 30 * 60 * 1000) {
                    setTop(articles);
                    return;
                }
            }

            try {
                const key = import.meta.env.VITE_API_KEY;
                const baseUrl = import.meta.env.VITE_API_URL;
                const PROXY = "https://corsproxy.io/?";
                const endpoint = `${baseUrl}/top-headlines?category=general&lang=en&max=5&apikey=${key}`;

                const response = await fetch(PROXY + encodeURIComponent(endpoint));
                const data = await response.json();

                if (data.articles) {
                    setTop(data.articles);
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        timestamp: Date.now(),
                        articles: data.articles
                    }));
                }
            } catch (err) {
                console.error("Sidebar Error:", err);
            }
        };

        fetchTrending();
    }, []);

    // Fallback data in case of API Error or Limit (100 limit reached)
    const displayData = top.length > 0 ? top : [
        { title: "Global market trends shifting in new quarter", source: { name: "Bloomberg" }, url: "#" },
        { title: "Advancements in AI reaching new milestones", source: { name: "TechWire" }, url: "#" },
        { title: "Renewable energy projects gain massive funding", source: { name: "Nature" }, url: "#" }
    ];

    return (
        <div className="glass-panel rounded-[2.5rem] p-8 sticky top-28">
            <div className="flex items-center gap-3 mb-10">
                <div className="p-2.5 bg-red-50 dark:bg-red-950/30 rounded-xl">
                    <HiFire className="text-brand text-2xl" />
                </div>
                <h3 className="text-2xl font-black italic tracking-tighter">
                    <span className="text-slate-900 dark:text-white">Trending</span>
                    <span className="text-brand">Now</span>
                </h3>
            </div>
            
            <div className="space-y-8">
                {displayData.map((item, idx) => (
                    <div key={idx} className="group cursor-pointer" onClick={() => item.url !== "#" && window.open(item.url, '_blank')}>
                        <div className="flex items-start gap-4">
                            <span className="text-4xl font-black text-slate-200 dark:text-slate-800 group-hover:text-brand/30 transition-colors shrink-0">0{idx + 1}</span>
                            <div>
                                <h4 className="text-sm font-bold text-text-main line-clamp-2 leading-snug group-hover:text-brand transition-colors mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-[10px] font-black uppercase text-brand tracking-widest">{item.source.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsSideBar;