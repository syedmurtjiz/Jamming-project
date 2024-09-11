import React from 'react';
import './SearchResults.css';
import Track from '../Track/Track';

const SearchResults = ({ tracks, addTrackToPlaylist }) => (
  <div className="SearchResults">
    <h2>Results</h2>
    <div className="TrackList">
      {tracks.map(track => (
        <Track
          key={track.id}
          track={track}
          trackActionCharacter="+"
          handleTrackAction={addTrackToPlaylist}
        />
      ))}
    </div>
  </div>
);

export default SearchResults;
