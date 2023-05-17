import React, { useEffect, useState } from 'react';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFavorites = async () => {
    setLoading(true);
    await getFavoriteSongs().then(setItems);
    setLoading(false);
  };

  useEffect(() => {
    handleFavorites();
  }, []);

  return (
    <section data-testid="page-favorites">
      <h1>Favorite Songs</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        items.map((item) => (
          <MusicCard
            { ...item }
            key={ item.trackId }
            trackId={ Number(item.trackId) }
            onChange={ handleFavorites }
          />
        ))
      )}
    </section>
  );
}
