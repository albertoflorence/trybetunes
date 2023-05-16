import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

export default function Login({ history }) {
  const [input, setInput] = useState({ name: '' });
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    const { name } = input;
    const MIN_LENGTH = 3;
    if (name.length >= MIN_LENGTH) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [input]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await createUser(input);
    setLoading(false);
    history.push('/search');
  };

  return (
    <section data-testid="page-login">
      <form onSubmit={ handleSubmit }>
        <input data-testid="login-name-input" name="name" onChange={ handleChange } />
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <button data-testid="login-submit-button" disabled={ !isValid } type="submit">
            Entrar
          </button>
        )}
      </form>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
