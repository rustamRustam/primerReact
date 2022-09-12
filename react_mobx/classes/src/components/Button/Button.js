import React from 'react';
import './Button.css.scss';

class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      onClick: this.props.onClick || null,
      title: this.props.title || 'Title',
      dopClass: this.props.dopClass || '',
    };
  }

  funcOnClick() {

  }

  render() {
    return (
      <div className="component-Button">
        <button
          className={this.state.dopClass}
          onClick={this.state.onClick}
        >{this.state.title}</button>
      </div>
    );
  }
};

export default Button;
