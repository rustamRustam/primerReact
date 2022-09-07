import React from 'react';
import './Button.css.scss';

function Button(props) {
  return (
    <div className="component-Button">
      <button
        className={props.dopClass}
        onClick={props.onClick}
      >{props.title}</button>
    </div>
  );
};

export default Button;
