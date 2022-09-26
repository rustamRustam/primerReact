import React from 'react';
import './Button.css.scss';

export interface ButtonProps {
  onClick?: (()=>void);
  title?: string;
  dopClass?: string;
};

function Button(props:ButtonProps) {
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
