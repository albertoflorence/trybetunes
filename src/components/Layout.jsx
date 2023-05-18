import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
