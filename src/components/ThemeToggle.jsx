import React, { useEffect, useState } from 'react';
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button 
            onClick={() => setIsDark(!isDark)}
            className="p-3 glass-panel rounded-2xl text-text-main hover:text-brand cursor-pointer"
        >
            {isDark ? <HiOutlineSun size={24} /> : <HiOutlineMoon size={24} />}
        </button>
    );
};

export default ThemeToggle;