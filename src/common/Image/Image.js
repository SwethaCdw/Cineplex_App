import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, alt, className, ...restProps }) => {
  return <img src={src} alt={alt} className={className} {...restProps} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Image.defaultProps = {
  className: '',
};

export default Image;