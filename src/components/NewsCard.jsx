import React from 'react';
import { HiOutlineArrowRight, HiOutlineBookmark, HiBookmark } from "react-icons/hi2";
import { FiShare2 } from "react-icons/fi";

const NewsCard = ({ news, bookmarks, onBookmark }) => {
    const fallback = "https://images.unsplash.com/photo-1585829365234-78ec202c463f?q=80&w=1000";

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10'>
            {news.map((item, i) => {
                const isSaved = bookmarks.some(b => b.url === item.url);
                return (
                    <article key={i} className='glass-panel rounded-[2rem] sm:rounded-[3rem] group hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden'>
                        <div className="relative h-52 sm:h-72 m-3 sm:m-4 overflow-hidden rounded-[1.5rem] sm:rounded-[2.2rem]">
                            <img src={item.image || fallback} className='w-full h-full object-cover transition-transform duration-700' alt="news" />
                            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                                <button onClick={() => onBookmark(item)} className="p-2.5 sm:p-3 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-xl text-slate-900 dark:text-white shadow-xl border-none cursor-pointer">
                                    {isSaved ? <HiBookmark className="text-brand" size={18} /> : <HiOutlineBookmark size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className='p-6 sm:p-10 pt-2 sm:pt-4 flex flex-col flex-grow'>
                            <div className='flex items-center gap-3 mb-3 sm:mb-5 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.1em] text-brand'>
                                <span>{item.source?.name}</span>
                                <span className="w-1 h-1 bg-text-sub rounded-full" />
                                <span className="text-text-sub">{new Date(item.publishedAt).toLocaleDateString()}</span>
                            </div>

                            <h3 className='text-lg sm:text-2xl font-black text-text-main leading-tight mb-3 sm:mb-5 line-clamp-2'>
                                {item.title}
                            </h3>
                            
                            <p className='text-text-sub text-xs sm:text-base line-clamp-3 mb-6 sm:mb-8 flex-grow font-medium leading-relaxed'>
                                {item.description}
                            </p>

                            <div className="mt-auto flex items-center justify-between border-t border-border-thin pt-4 sm:pt-6">
                                <a href={item.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] sm:text-sm font-black text-text-main uppercase tracking-widest no-underline group/btn">
                                    Full Story <HiOutlineArrowRight className="group-hover/btn:translate-x-1 transition-transform text-brand" />
                                </a>
                                <button className="text-text-sub hover:text-brand transition-colors bg-transparent border-none cursor-pointer"><FiShare2 size={18} /></button>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default NewsCard;