import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';

export default function Header() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const handleUser = async () => {
      setUser(await getUser());
    };
    handleUser();
  }, [setUser]);

  return (
    <header data-testid="header-component">
      <nav>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </nav>
      <span data-testid="header-user-name">{user.name || 'Carregando...'}</span>
    </header>
  );
}
