import React from 'react';
import { BiCategoryAlt } from "react-icons/bi";

const categories = ["general", "business", "technology", "entertainment", "health", "science", "sports"];

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
    return (
        <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-500/30 shrink-0">
                <BiCategoryAlt className="text-xl" />
                <span className="text-xs font-black uppercase tracking-widest">Feed</span>
            </div>
            <div className="flex gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all capitalize whitespace-nowrap border ${
                            activeCategory === cat 
                            ? "bg-slate-900 dark:bg-red-600 text-white border-transparent shadow-xl scale-105" 
                            : "glass-card text-slate-500 dark:text-slate-400 hover:border-red-500 hover:text-red-500"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;