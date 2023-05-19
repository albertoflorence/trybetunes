import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading/Loading';
import './profile.css';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    const handleUser = async () => {
      setLoading(true);
      await getUser().then(setUser);
      setLoading(false);
    };
    handleUser();
  }, []);
  return (
    <section data-testid="page-profile" className="profile">
      <header className="profile-header">
        {loading || (
          <div className="profile-avatar">
            <img src={ user.image } alt={ user.name } />
          </div>
        )}
      </header>
      {loading ? (
        <Loading color="secondary" textColor="gray" />
      ) : (
        <div className="profile-content">
          <h3>Nome</h3>
          <p>{user.name}</p>
          <h3>E-mail</h3>
          <p>{user.email}</p>
          <h3>Descrição</h3>
          <p>{user.description}</p>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      )}
    </section>
  );
}
