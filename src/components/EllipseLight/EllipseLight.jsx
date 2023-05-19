import React from 'react';
import PropTypes from 'prop-types';

import './ellipseLight.css';
import clsx from '../../utils/clsx';

export default function EllipseLight({
  top = 'auto',
  right = 'auto',
  bottom = 'auto',
  left = 'auto',
  size = 0,
  color = 'primary',
  type = 'light',
}) {
  const style = {
    top,
    right,
    bottom,
    left,
    width: size,
    height: size,
  };
  return <div style={ style } className={ clsx('ellipseLight', color, type) } />;
}

EllipseLight.propTypes = {
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary']),
  type: PropTypes.oneOf(['light', 'border']),
};
