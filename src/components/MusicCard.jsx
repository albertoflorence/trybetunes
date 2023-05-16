import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

export default function MusicCard({ previewUrl, trackName, trackId }) {
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    setLoading(true);
    await addSong({ trackId });
    setLoading(false);
    setFavorite(true);
  };

  return (
    <div>
      <span>{trackName}</span>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio>
      {loading ? (
        <span>Carregando...</span>
      ) : (
        <input
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          checked={ favorite }
          onChange={ handleChange }
        />
      )}
    </div>
  );
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
