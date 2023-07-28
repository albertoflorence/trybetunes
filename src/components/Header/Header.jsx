import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { getUser } from '../../services/userAPI';
import Logo from '../Logo';
import Search from '../icons/Search';
import './header.css';
import Star from '../icons/Star';
import Profile from '../icons/Profile';

const links = [{
  Icon: Search,
  testid: 'link-to-search',
  text: 'Pesquisa',
  to: '/search',
},
{
  Icon: Star,
  testid: 'link-to-favorites',
  text: 'Favoritas',
  to: '/favorites',
},
{
  Icon: Profile,
  testid: 'link-to-profile',
  text: 'Perfil',
  to: '/profile',
}];

export default function Header() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const handleUser = async () => {
      setUser(await getUser());
    };
    handleUser();
  }, [setUser]);

  const renderProfile = (
    <>
      <img src={ user.image } alt="Foto do usuário" />
      <span>{user.name}</span>
    </>
  );

  return (
    <header data-testid="header-component" className="header">
      <section className="header-content">
        <Logo small />
        <nav className="header-navigation">
          <div>
            {links.map(({ Icon, testid, text, to }) => (
              <NavLink
                key={ text }
                data-testid={ testid }
                to={ to }
                className="navigation-link"
              >
                <Icon />
                {text}
              </NavLink>
            ))}
          </div>
        </nav>
        <div
          data-testid="header-user-name"
          className="header-profile"
        >
          {user.name ? renderProfile : 'Carregando...'}
        </div>
      </section>
    </header>
  );
}
