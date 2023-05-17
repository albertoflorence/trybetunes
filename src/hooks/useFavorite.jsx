import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

export const favoriteDefaultValues = {
  items: [],
  hasItem: () => false,
  toggle: () => {},
  loading: false,
};

export const FavoriteContext = createContext(favoriteDefaultValues);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleGetFavorites = async () => {
      setLoading(true);
      setFavorites(await getFavoriteSongs());
      setLoading(false);
    };
    handleGetFavorites();
  }, []);

  const hasItem = useCallback(
    (trackId) => favorites.some((item) => item.trackId === trackId),
    [favorites],
  );

  const toggle = useCallback(
    async (item) => {
      const action = !hasItem(item.trackId) ? addSong : removeSong;
      await action(item);
      setFavorites(await getFavoriteSongs());
    },
    [hasItem],
  );

  return (
    <FavoriteContext.Provider
      value={ useMemo(
        () => ({
          items: favorites,
          hasItem,
          loading,
          toggle,
        }),
        [loading, favorites, hasItem, toggle],
      ) }
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorite = () => useContext(FavoriteContext);

FavoriteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
