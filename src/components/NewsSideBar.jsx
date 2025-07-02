import React, { useEffect, useState } from 'react';

const NewsSideBar = () => {
    const [topNews, setTopNews] = useState([]);

    const topNewsApi = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            setTopNews(data.articles);
        } catch (error) {
            console.error('Error fetching top news:', error);
            setTopNews([]); 
        }
    };

    useEffect(() => {
        topNewsApi();
    }, []); 

    return (
        <div className="p-5">
            <h3 className="text-3xl lg:text-8xl font-semibold py-8">Top News</h3>
            <div>
                {topNews && topNews.map((top, index) => (
                    <div key={index} className="my-5 border-b-2 px-4 shadow-xl border-red-600">
                        <h4 className="text-lg lg:text-base font-normal mb-2">{top.title}</h4>
                        <a href={top.url} target="_blank" rel="noreferrer" className="text-red-500 text-sm lg:text-base pb-2 hover:text-red-700 inline-flex items-center">
                            Read more
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsSideBar;
