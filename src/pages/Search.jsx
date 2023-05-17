import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { searchValidate } from '../validate';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

function renderAlbum(props) {
  const {
    artistId,
    artistName,
    collectionId,
    collectionName,
    collectionPrice,
    artworkUrl100,
    releaseDate,
    trackCount,
  } = props;
  return (
    <div key={ collectionId }>
      <p>{artistId}</p>
      <p>{artistName}</p>
      <p>{collectionName}</p>
      <p>{collectionPrice}</p>
      <p>{artworkUrl100}</p>
      <p>{releaseDate}</p>
      <p>{trackCount}</p>
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        {collectionName}

      </Link>
    </div>
  );
}

function renderShowcase({ search, albums }) {
  return (
    <div>
      <h1>
        {'Resultado de álbuns de: '}
        {search}
      </h1>
      {albums.map(renderAlbum)}
    </div>
  );
}

export default function Search() {
  const [search, setSearch] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsValid(searchValidate(search));
  }, [search]);

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const result = await searchAlbumsAPI(search);
    setLoading(false);
    if (result.length === 0) setError('Nenhum álbum foi encontrado.');
    setAlbums(result);
  };

  return (
    <section data-testid="page-search">
      <form onSubmit={ handleSubmit }>
        {loading ? (
          'Carregando...'
        ) : (
          <div>
            <input
              data-testid="search-artist-input"
              type="text"
              onChange={ handleChange }
            />
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ !isValid }
            >
              Search
            </button>
          </div>
        )}
        {error ? <h1>{error}</h1> : renderShowcase({ search, albums })}
      </form>
    </section>
  );
}
