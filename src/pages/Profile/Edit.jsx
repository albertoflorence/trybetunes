import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser, updateUser } from '../../services/userAPI';
import { editUserValidate } from '../../validate/editUser';

export default function Edit() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    const handleUser = async () => {
      setLoading(true);
      await getUser().then(setUser);
      setLoading(false);
    };
    handleUser();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(user);
    history.push('/profile');
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <section data-testid="page-profile-edit">
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="edit-input-name"
          type="text"
          value={ user.name }
          name="name"
          onChange={ handleChange }
        />
        <input
          data-testid="edit-input-email"
          type="text"
          value={ user.email }
          name="email"
          onChange={ handleChange }
        />
        <input
          data-testid="edit-input-description"
          type="text"
          name="description"
          value={ user.description }
          onChange={ handleChange }
        />
        <input
          data-testid="edit-input-image"
          type="text"
          value={ user.image }
          name="image"
          onChange={ handleChange }
        />
        <button
          data-testid="edit-button-save"
          type="submit"
          disabled={ !editUserValidate(user) }
        >
          Salvar
        </button>
      </form>
    </section>
  );
}
