import React from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

const Pagination = ({ current, onChange }) => {
    return (
        <div className="flex items-center justify-center gap-4 mt-16">
            <button 
                disabled={current === 1}
                onClick={() => onChange(current - 1)}
                className="p-4 glass-panel rounded-2xl disabled:opacity-20 hover:text-brand cursor-pointer"
            >
                <HiOutlineChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(p => (
                    <button 
                        key={p}
                        onClick={() => onChange(p)}
                        className={`w-12 h-12 rounded-2xl font-black transition-all cursor-pointer ${current === p ? 'bg-brand text-white shadow-lg shadow-brand/40 scale-110' : 'glass-panel text-text-main hover:bg-brand/10'}`}
                    >
                        {p}
                    </button>
                ))}
            </div>
            <button 
                onClick={() => onChange(current + 1)}
                className="p-4 glass-panel rounded-2xl hover:text-brand cursor-pointer"
            >
                <HiOutlineChevronRight size={24} />
            </button>
        </div>
    );
};

export default Pagination;