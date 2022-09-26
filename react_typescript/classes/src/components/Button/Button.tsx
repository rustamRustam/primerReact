import React from 'react';
import './Button.css.scss';

export interface ButtonProps {
  onClick?: (()=>void);
  title?: string;
  dopClass?: string;
};

export interface ButtonState {
  onClick: (()=>void) | null;
  title: string;
  dopClass: string;
};

class Button<BP extends ButtonProps = ButtonProps> extends React.Component<BP,ButtonState> {

  state: ButtonState = {
    onClick: null,
    title: 'Title',
    dopClass: '',
  }

  constructor(props:BP) {
    super(props);
    this.state = {
      onClick: this.props.onClick || null,
      title: this.props.title || 'Title',
      dopClass: this.props.dopClass || '',
    };
  }

  render() {
    return (
      <div className="component-Button">
        <button
          className={this.state.dopClass}
          onClick={()=>{
            if(this.state.onClick){
              this.state.onClick()
            }
          } }
        >{this.state.title}</button>
      </div>
    );
  }
};

export default Button;
