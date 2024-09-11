import React, { useState, useEffect } from 'react';
import './SearchBar.css';

function SearchBar({ searchSpotify }) {
  const [searchTerm, setSearchTerm] = useState(window.localStorage.getItem('searchTerm') || "");

  useEffect(() => {
    window.localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);
  const handleSearch = async () => {
    try {
      await searchSpotify(searchTerm);
    } catch {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=0744a9d113234aed9830ca9b36b3be57&response_type=token&scope=playlist-modify-public&redirect_uri=${window.location.href}`;
    }
  };
  return (
    <div className="SearchBar">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Enter a song title"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
