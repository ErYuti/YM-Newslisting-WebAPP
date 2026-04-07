import React, { useEffect, useState } from 'react';
import { HiFire } from "react-icons/hi2";

const NewsSideBar = () => {
    const [top, setTop] = useState([]);

    useEffect(() => {
        fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${import.meta.env.VITE_API_KEY}`)
            .then(r => r.json()).then(d => setTop(d.articles || []));
    }, []);

    return (
        <div className="glass-panel rounded-[2.5rem] p-8 sticky top-28">
            <div className="flex items-center gap-3 mb-10">
                <div className="p-2.5 bg-brand/10 rounded-xl"><HiFire className="text-brand text-2xl" /></div>
                <h3 className="text-xl font-black text-text-main italic tracking-tighter">Trending<span className="text-brand">Now</span></h3>
            </div>
            
            <div className="space-y-8">
                {top.map((item, idx) => (
                    <div key={idx} className="group cursor-pointer">
                        <div className="flex items-start gap-4">
                            <span className="text-4xl font-black text-text-sub/10 group-hover:text-brand/30 transition-colors">0{idx + 1}</span>
                            <div>
                                <h4 className="text-sm font-bold text-text-main line-clamp-2 leading-snug group-hover:text-brand transition-colors mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-[10px] font-black uppercase text-text-sub tracking-widest">{item.source.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsSideBar;