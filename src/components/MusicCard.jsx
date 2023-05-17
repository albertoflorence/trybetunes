import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFavorite } from '../hooks/useFavorite';

export default function MusicCard({ previewUrl, trackName, trackId }) {
  const { loading, hasItem, toggle } = useFavorite();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async () => {
    setIsLoading(true);
    await toggle({ previewUrl, trackName, trackId });
    setIsLoading(false);
  };

  return (
    <div>
      <span>{trackName}</span>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio>
      {(loading || isLoading) ? (
        <span>Carregando...</span>
      ) : (
        <input
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          checked={ hasItem(trackId) }
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
