import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, type, children, className, ...restProps  }) => {
  return (
    <button onClick={onClick} type={type} className={className} {...restProps} >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  className: '',
};

export default Button;
