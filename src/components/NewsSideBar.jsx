import React, { useEffect, useState } from 'react';
import { HiFire } from "react-icons/hi2";

const NewsSideBar = () => {
    const [top, setTop] = useState([]);

useEffect(() => {
    const fetchTrending = async () => {
        const key = import.meta.env.VITE_API_KEY;
        const baseUrl = import.meta.env.VITE_API_URL; // Ensure this is GNews
        
        // Correct GNews URL
        const url = `${baseUrl}/top-headlines?category=general&lang=en&max=5&apikey=${key}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.articles) setTop(data.articles);
        } catch (err) {
            console.error("Sidebar Error:", err);
        }
    };
    fetchTrending();
}, []);

    // Static Fallback data so the UI never looks empty even if API fails
    const displayItems = top.length > 0 ? top : [
        { title: "Global markets react to new economic shifts", source: { name: "Economics" }, url: "#" },
        { title: "New breakthroughs in sustainable energy reported", source: { name: "Science" }, url: "#" },
        { title: "Major tech event reveals next-gen AI tools", source: { name: "TechCrunch" }, url: "#" }
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
                {displayItems.map((item, idx) => (
                    <div key={idx} className="group cursor-pointer" onClick={() => item.url !== "#" && window.open(item.url, '_blank')}>
                        <div className="flex items-start gap-4">
                            <span className="text-4xl font-black text-slate-200 dark:text-slate-800 group-hover:text-brand/30 transition-colors">0{idx + 1}</span>
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