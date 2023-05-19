/* eslint-disable react/no-multi-comp */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getUser, updateUser } from '../../../services/userAPI';
import { editUserValidate } from '../../../validate/editUser';
import './edit.css';
import Loading from '../../../components/Loading/Loading';

const inputs = [
  {
    text: 'Nome',
    label: 'Fique à vontade para usar seu nome social',
    placeholder: 'Placeholder',
    Element: (props) => <input { ...props } />,
    name: 'name',
    className: 'edit-name',
  },
  {
    text: 'Email',
    label: 'Escolha um e-mail que consulta diariamente',
    placeholder: 'seu_nome@email.com.br',
    Element: (props) => <input { ...props } />,
    name: 'email',
    className: 'edit-email',
  },
  {
    text: 'Descrição',
    placeholder: 'Sobre mim',
    Element: (props) => <textarea { ...props } />,
    name: 'description',
    className: 'edit-description',
  },
];

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

  return (
    <section data-testid="page-profile-edit" className="edit">
      <header className="edit-header">
        {loading || (
          <div className="edit-avatar">
            <img src={ user.image } alt={ user.name } />
          </div>
        )}
      </header>
      {loading ? <Loading color="secondary" textColor="gray" /> : (
        <form onSubmit={ handleSubmit } className="edit-content">
          {inputs.map(({ text, label, placeholder, Element, name, className }) => (
            <div className="edit-inputGroup" key={ name }>
              <h3>{text}</h3>
              {label && <label htmlFor={ name }>{label}</label>}
              <Element
                id={ name }
                type="text"
                value={ user[name] }
                name={ name }
                onChange={ handleChange }
                placeholder={ placeholder }
                className={ className }
              />
            </div>
          ))}
          <input
            type="text"
            value={ user.image }
            name="image"
            onChange={ handleChange }
            className="edit-image"
            placeholder="Insira um link"
          />
          <button
            data-testid="edit-button-save"
            type="submit"
            disabled={ !editUserValidate(user) }
            className="edit-button"
          >
            Salvar
          </button>
        </form>
      )}
    </section>
  );
}
