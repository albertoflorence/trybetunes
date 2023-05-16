import React, { useEffect, useState } from 'react';

import { searchValidate } from '../validate';

export default function Search() {
  const [search, setSearch] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(searchValidate(search));
  }, [search]);

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <section data-testid="page-search">
      <form onSubmit={ handleSubmit }>
        <input data-testid="search-artist-input" type="text" onChange={ handleChange } />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ !isValid }
        >
          Search
        </button>
      </form>
    </section>
  );
}
