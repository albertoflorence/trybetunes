import React, { useEffect, useState } from 'react';

import MusicCard from '../../components/MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import './favorites.css';
import Loading from '../../components/Loading/Loading';

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animateItem, setAnimateItem] = useState({});

  const handleFavorites = async (trackId) => {
    setAnimateItem({ [trackId]: true });
    await getFavoriteSongs().then(setItems);
    setAnimateItem({ [trackId]: false });
  };

  useEffect(() => {
    handleFavorites().then(() => setLoading(false));
  }, []);

  return (
    <section data-testid="page-favorites" className="favorites">
      <header className="favorites-header">
        <h1>Músicas Favoritas</h1>
      </header>
      <section className="favorites-content">
        {loading ? (
          <Loading Loading color="secondary" textColor="gray" />
        ) : (
          items.map((item) => (
            <MusicCard
              { ...item }
              key={ item.trackId }
              trackId={ Number(item.trackId) }
              onChange={ () => handleFavorites(item.trackId) }
              className={ animateItem[item.trackId] ? 'slideOut' : '' }
            />
          ))
        )}
      </section>
    </section>
  );
}
