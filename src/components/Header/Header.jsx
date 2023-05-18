import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { getUser } from '../../services/userAPI';
import Logo from '../Logo';
import Search from '../icons/Search';
import './header.css';
import Star from '../icons/Star';
import Profile from '../icons/Profile';

export default function Header() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const handleUser = async () => {
      setUser(await getUser());
    };
    handleUser();
  }, [setUser]);

  const renderProfile = (
    <div className="header-profile">
      <img src="https://avatars.githubusercontent.com/u/16692794?v=4" alt="Foto do usuário" />
      <span>{user.name}</span>
    </div>
  );

  return (
    <header data-testid="header-component" className="header">
      <Logo small />
      <nav className="header-navigation">
        <div>
          <NavLink data-testid="link-to-search" to="/search" className="navigation-link">
            <Search />
            Search
          </NavLink>
          <NavLink
            data-testid="link-to-favorites"
            to="/favorites"
            className="navigation-link"
          >
            <Star />
            Favorites
          </NavLink>
          <NavLink
            data-testid="link-to-profile"
            to="/profile"
            className="navigation-link"
          >
            <Profile />
            Profile
          </NavLink>
        </div>
      </nav>
      <span
        data-testid="header-user-name"
      >
        {user.name ? renderProfile : 'Carregando...'}
      </span>
    </header>
  );
}
