import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (query.trim() !== '') {
            onSearch(query);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="sm:flex sm:items-center">
                <input
                    className="w-full text-black rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-red-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm"
                    type="text"
                    placeholder="Search for news..."
                    value={query}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
