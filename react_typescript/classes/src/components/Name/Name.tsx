import React, {Component} from "react";
import "./Name.css.scss";

import { TUpdateFilter } from '../../store/Kartochki';

type NameProps = {
  value: string;
  disabled: boolean;
  updateFilter?: TUpdateFilter;
};

type NameState = {
  value: string;
};

class Name extends Component<NameProps, NameState> {

  state:NameState = {
    value: ''
  };

  timeId: ReturnType<typeof setTimeout> | null = null;


  constructor(props:NameProps) {
    super(props);

    this.state = {
      value: this.props.value || ''
    }

    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput(e:React.ChangeEvent<HTMLInputElement>) {
    const result = e.target.value;
    this.setState({value: result});
    if(this.timeId) {
      clearTimeout(this.timeId);
    }
    this.timeId = setTimeout(()=>{
      this.timeId = null;
      e.target.blur();
      if(this.props.updateFilter) {
        this.props.updateFilter('q', result);
      }
    },500);

  }

  render() {
    return (
      <div className={"container-Name" + ((this.props.disabled)?" disabled ":'')} >
        <input key="nameInput"
          type="text"
          className="name-input"
          value={this.state.value}
          placeholder="Наименование картины"
          onChange={ (e:React.ChangeEvent<HTMLInputElement>) =>{ (this.props.disabled) ? null : this.onChangeInput(e); } }
        />
      </div>
    );
  }
}

export default Name;
