import React from 'react';
import { HiOutlineArrowRight, HiOutlineBookmark, HiBookmark, HiOutlineClock } from "react-icons/hi2";
import { FiShare2 } from "react-icons/fi";

const NewsCard = ({ news, bookmarks, onBookmark }) => {
    const fallback = "https://images.unsplash.com/photo-1585829365234-78ec202c463f?q=80&w=1000";

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {news.map((item, i) => {
                const isSaved = bookmarks.some(b => b.url === item.url);
                return (
                    <article key={i} className='glass-panel rounded-[3rem] group hover:-translate-y-3 transition-all duration-500 flex flex-col overflow-hidden'>
                        <div className="relative h-72 m-4 overflow-hidden rounded-[2.2rem]">
                            <img src={item.urlToImage || fallback} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000' alt="news" />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button onClick={() => onBookmark(item)} className="p-3 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-2xl text-slate-900 dark:text-white shadow-xl hover:scale-110 transition-all cursor-pointer">
                                    {isSaved ? <HiBookmark className="text-brand" size={22} /> : <HiOutlineBookmark size={22} />}
                                </button>
                            </div>
                        </div>

                        <div className='p-10 pt-4 flex flex-col flex-grow'>
                            <div className='flex items-center gap-4 mb-5 text-[11px] font-black uppercase tracking-[0.2em] text-brand'>
                                <span>{item.source?.name}</span>
                                <span className="w-1 h-1 bg-text-sub rounded-full" />
                                <span className="flex items-center gap-1 text-text-sub"><HiOutlineClock /> 4 Min Read</span>
                            </div>

                            <h3 className='text-2xl font-black text-text-main leading-tight mb-5 group-hover:text-brand transition-colors line-clamp-2'>
                                {item.title}
                            </h3>
                            
                            <p className='text-text-sub text-base line-clamp-3 mb-8 leading-relaxed font-medium'>
                                {item.description}
                            </p>

                            <div className="mt-auto flex items-center justify-between border-t border-border-thin pt-6">
                                <a href={item.url} target="_blank" className="flex items-center gap-2 text-sm font-black text-text-main uppercase tracking-widest group/btn">
                                    Full Story <HiOutlineArrowRight className="group-hover/btn:translate-x-2 transition-transform text-brand" />
                                </a>
                                <button className="text-text-sub hover:text-brand transition-colors"><FiShare2 size={20} /></button>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default NewsCard;