import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ onSearch }) => {
    const [val, setVal] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(val);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full group">
            <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sub group-focus-within:text-brand transition-colors text-xl" />
            <input 
                type="text"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                placeholder="Search global news..."
                className="w-full bg-white/5 dark:bg-black/20 border border-border-thin py-4 pl-12 pr-24 rounded-2xl outline-none focus:ring-2 focus:ring-brand/50 text-text-main placeholder:text-text-sub font-medium transition-all"
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-brand text-white px-6 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 cursor-pointer">
                Search
            </button>
        </form>
    );
};

export default SearchBar;