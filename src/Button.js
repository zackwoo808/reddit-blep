import React from 'react';
import PropTypes from 'prop-types';

function Button({ value, onClick }) {
  return(
    <span>
      <button
        onClick={() => onClick()}
        className="subredditButton"
      >
        {value}
      </button>
    </span>
  );
}

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button;