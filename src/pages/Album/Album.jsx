import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import getMusics from '../../services/musicsAPI';
import MusicCard from '../../components/MusicCard';
import './album.css';

export default function Album({ id }) {
  const [info, setInfo] = useState({});
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGetMusic = async () => {
      setLoading(true);
      const [result, ...results] = await getMusics(id);
      setLoading(false);
      setInfo(result);
      setTracks(results);
    };
    handleGetMusic();
  }, [id]);
  if (loading) return null;
  return (
    <section data-testid="page-album" className="album">
      <header className="album-header">
        <img
          src={ info.artworkUrl100.replace('100x100', '200x200') }
          alt={ info.collectionName }
        />
        <p data-testid="artist-name">{info.artistName}</p>
        <p data-testid="album-name">{info.collectionName}</p>
      </header>
      <div className="album-content">
        {tracks.map(({ trackId, ...props }) => (
          <MusicCard key={ trackId } trackId={ trackId } { ...props } />
        ))}
      </div>
    </section>
  );
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
};
