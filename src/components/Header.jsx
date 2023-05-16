import React, { useEffect, useState } from 'react';

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
      <span data-testid="header-user-name">{user.name || 'Carregando...'}</span>
    </header>
  );
}
