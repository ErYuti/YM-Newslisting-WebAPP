import React from 'react';

const NewsCard = ({ news }) => {
    return (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 p-10'>
            {news && news.map((newss, index) => (
                <div key={index} className='shadow-xl rounded-2xl bg-white'>
                    <img src={newss.urlToImage} alt="newsImage" className='w-full h-60 rounded-xl pb-6' />
                    <div className='flex justify-between px-3'>
                        <p className='text-xs text-gray-800'>{newss.author}</p>
                        <p className='text-xs text-gray-800'>{new Date(newss.publishedAt).toDateString()}</p>
                    </div>
                    <div className='py-5 px-5'>
                        <h3 className='pb-3 text-2xl font-semibold text-black'>{newss.title}</h3>
                        <p className='pb-5 text-sm font-normal text-gray-700'>{newss.description}</p>
                        <a href={newss.url} target="_blank" rel="noreferrer" className="text-white text-sm font-medium bg-red-500 rounded-full px-4 py-3 hover:bg-red-400 cursor-pointer">
                            Read more
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsCard;
