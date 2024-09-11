import React, { useState, useEffect } from 'react';
import './App.css';
import Spotify from '../../utils/Spotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

const App = () => {
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [spotifyToken, setSpotifyToken] = useState('');

  useEffect(() => {
    const token = window.location.hash.split('&')[0].substring(14) || '';
    setSpotifyToken(token);
  }, []);

  const searchSpotify = async (terms) => {
    const results = await Spotify.search(terms, spotifyToken);
    setSearchedTracks(results);
  };

  const createSpotifyPlaylist = async (name, trackIds) => {
    await Spotify.createPlaylist(name, trackIds, spotifyToken);
    setPlaylistTracks([]);
  };

  const addTrackToPlaylist = (track) => {
    setPlaylistTracks(prev => 
      prev.find(t => t.id === track.id) ? prev : [...prev, track]
    );
  };

  const removeTrackFromPlaylist = (track) => {
    setPlaylistTracks(prev => prev.filter(t => t.id !== track.id));
  };
  return (
    <div>
      <h1>Ja<span className="highlight">mm</span>ing</h1>
      <div className="App">
        <SearchBar searchSpotify={searchSpotify} />
        <div className="App-playlist">
          <SearchResults 
            tracks={searchedTracks} 
            addTrackToPlaylist={addTrackToPlaylist} 
          />
          <Playlist 
            tracks={playlistTracks}
            removeTrackFromPlaylist={removeTrackFromPlaylist}
            createSpotifyPlaylist={createSpotifyPlaylist}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
