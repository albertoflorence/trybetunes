import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { createUser } from '../../services/userAPI';
import { loginValidate } from '../../validate';
import Logo from '../../components/Logo';
import './login.css';

export default function Login({ history }) {
  const [input, setInput] = useState({ name: '' });
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    setIsValid(loginValidate(input.name));
  }, [input]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await createUser(input);
    setLoading(false);
    history.push('/search');
  };

  return (
    <section data-testid="page-login" className="login">
      <form onSubmit={ handleSubmit } className="login-form">
        <Logo />
        <div className="login-content">
          <input
            data-testid="login-name-input"
            name="name"
            onChange={ handleChange }
            placeholder="qual é o seu nome?"
          />
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <button data-testid="login-submit-button" disabled={ !isValid } type="submit">
              Entrar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
