import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default function Album({ id }) {
  const [info, setInfo] = useState({});
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const handleGetMusic = async () => {
      const [result, ...results] = await getMusics(id);
      setInfo(result);
      setTracks(results);
    };
    handleGetMusic();
  }, [id]);

  return (
    <section data-testid="page-album">
      <span data-testid="artist-name">{info.artistName}</span>
      <span data-testid="album-name">{info.collectionName}</span>
      <div>
        {tracks.map(
          ({ trackId, ...props }) => <MusicCard key={ trackId } { ...props } />,
        )}
      </div>
    </section>
  );
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
};
