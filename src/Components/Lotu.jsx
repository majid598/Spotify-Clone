import React, { useState } from 'react';

const Song = ({ song, onPlay }) => {
  const handlePlay = () => {
    onPlay(song);
  };

  return (
    <div className="song">
      <img src={song.albumArt} alt={song.title} />
      <div>{song.title}</div>
      <div>{song.artist}</div>
      <button onClick={handlePlay}>Play</button>
    </div>
  );
};

const Playlist = ({ songs, onPlay }) => {
  return (
    <div className="playlist">
      {songs.map(song => (
        <Song key={song.id} song={song} onPlay={onPlay} />
      ))}
    </div>
  );
};

const Player = ({ currentSong, onNext, onPrev }) => {
  return (
    <div className="player">
      <audio src={currentSong.audioUrl} autoPlay controls />
      <button onClick={onPrev}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

const SpotifyClone = () => {
  const [songs, setSongs] = useState([]); // Array of songs
  const [currentSong, setCurrentSong] = useState(null);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const playNext = () => {
    // Logic to play the next song
  };

  const playPrevious = () => {
    // Logic to play the previous song
  };

  return (
    <div className="spotify-clone">
      <Playlist songs={songs} onPlay={playSong} />
      {currentSong && <Player currentSong={currentSong} onNext={playNext} onPrev={playPrevious} />}
    </div>
  );
};

export default SpotifyClone;
