import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../../services/userAPI';

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
    <section data-testid="page-profile">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <h1>Perfil</h1>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.description}</p>
          <div>
            <img data-testid="profile-image" src={ user.image } alt={ user.name } />
          </div>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      )}
    </section>
  );
}
