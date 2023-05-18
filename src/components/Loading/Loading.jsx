import React from 'react';
import PropTypes from 'prop-types';

import clsx from '../../utils/clsx';
import './loading.css';

export default function Loading({ color = 'primary', textColor = 'primary' }) {
  return (
    <div className="loading">
      <div className={ clsx('lds-roller', color) }>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={ index } />
        ))}
      </div>
      <h1 className={ clsx('loading-text', textColor) }>
        Carregando...
      </h1>
    </div>
  );
}

Loading.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  textColor: PropTypes.oneOf(['primary', 'secondary', 'gray']),
};
