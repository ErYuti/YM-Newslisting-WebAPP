import React from 'react';
import NewsListingPage from './components/NewsListingPage';
import { FaTwitter, FaGithub } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";

function App() {
  return (
    <div className="selection:bg-red-200 selection:text-red-900">
      <NewsListingPage />
      <footer className="bg-slate-950 text-white pt-20 pb-10 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12">
          <div>
             <h2 className="text-3xl font-black mb-4 tracking-tighter">YM<span className="text-red-600">NEWS</span></h2>
             <p className="text-gray-400 text-sm leading-relaxed font-medium">
               The next generation of news delivery. Real-time, curated, and styled for the modern web.
             </p>
          </div>
          <div className="flex flex-col gap-4">
             <h4 className="font-bold text-red-500 uppercase text-xs tracking-[0.2em]">Connect</h4>
             <p className="text-sm text-gray-400 font-medium">contact@yutimeher.com</p>
             <div className="flex gap-4">
                <FaTwitter className="text-xl cursor-pointer hover:text-red-500 transition-colors" />
                <FaGithub className="text-xl cursor-pointer hover:text-red-500 transition-colors" />
                <IoMailOutline className="text-xl cursor-pointer hover:text-red-500 transition-colors" />
             </div>
          </div>
          <div className="text-sm text-gray-400">
            <h4 className="font-bold text-red-500 uppercase text-xs tracking-[0.2em] mb-4">Newsletter</h4>
            <div className="flex gap-2">
                <input type="text" placeholder="Your Email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full outline-none focus:border-red-500 transition-colors" />
                <button className="bg-red-600 px-6 py-2 rounded-lg font-black text-white hover:bg-red-700 transition-all">JOIN</button>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs mt-10 font-medium">
          &copy; 2024 YM News. Designed with precision by <span className="text-white font-bold">yutiMeher</span>
        </p>
      </footer>
    </div>
  );
}

export default App;