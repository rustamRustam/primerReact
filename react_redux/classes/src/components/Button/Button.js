import React from 'react';
import './Button.css.scss';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.funcOnClick = this.funcOnClick.bind(this);
  }

  funcOnClick() {
  }

  render() {
    return (
      <div className="component-Button">
        <button
          className={this.props.dopClass}
          onClick={()=>{this.funcOnClick()} }
        >{this.props.title}</button>
      </div>
    );
  }
};

export default Button;
