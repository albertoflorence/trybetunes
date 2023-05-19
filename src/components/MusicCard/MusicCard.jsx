import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import './musicCard.css';
import Favorite from '../icons/Favorite';
import Spinner from '../Spinner/Spinner';

export default function MusicCard({ onChange = undefined, ...props }) {
  const { previewUrl, trackName, trackId } = props;
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFavoriteSongs()
      .then((songs) => songs.some((song) => song.trackId === trackId))
      .then(setFavorite);
  }, [trackId]);

  const handleChange = async () => {
    setLoading(true);
    const action = favorite ? removeSong : addSong;
    await action(props);
    setFavorite(!favorite);
    setLoading(false);
    if (onChange) onChange();
  };

  return (
    <div className="musicCard">
      <span>{trackName}</span>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio>
      {loading ? (
        <Spinner />
      ) : (
        <Favorite
          data-testid={ `checkbox-music-${trackId}` }
          onClick={ handleChange }
          aria-label="Favorita"
          filled={ favorite }
        />
      )}
    </div>
  );
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};
