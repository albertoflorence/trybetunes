import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { searchValidate } from '../../validate';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import './search.css';
import Loading from '../../components/Loading';

function renderAlbum(props) {
  const { artistName, collectionId, collectionName, artworkUrl100 } = props;
  return (
    <div key={ collectionId } className="search-album">
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <div className="search-album--image">
          <img
            src={ artworkUrl100.replace('100x100bb', '200x200bb') }
            alt={ artistName }
          />
        </div>
        <p>{artistName}</p>
        <p>{collectionName}</p>
      </Link>
    </div>
  );
}

function renderShowcase({ text, albums }) {
  return (
    <div className="search-content">
      {albums.length > 0 && (
        <h1>
          {'Resultado de álbuns de: '}
          {text}
        </h1>
      )}
      <div className="search-showcase">{albums.map(renderAlbum)}</div>
    </div>
  );
}

const renderContent = ({ loading, error, text, albums }) => {
  if (loading) return <Loading color="secondary" textColor="gray" />;
  if (error) {
    return (
      <div>
        <h1 className="search-error">
          <img src="error.svg" alt="Error" />
          <div>{error}</div>
        </h1>
      </div>
    );
  }
  return renderShowcase({ text, albums });
};

export default function Search() {
  const [search, setSearch] = useState('');
  const [lastSearch, setLastSearch] = useState('');
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
    setLastSearch(search);
    setSearch('');
  };

  return (
    <section data-testid="page-search" className="search">
      <form onSubmit={ handleSubmit } className="search-form">
        <div className="search-input">
          <input
            data-testid="search-artist-input"
            type="text"
            value={ search }
            onChange={ handleChange }
            placeholder="nome do artista"
          />
          <img src="search.svg" alt="search" />
        </div>
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ !isValid }
          className="search-button"
        >
          Procurar
        </button>
      </form>
      {renderContent({ loading, error, text: lastSearch, albums })}
    </section>
  );
}
