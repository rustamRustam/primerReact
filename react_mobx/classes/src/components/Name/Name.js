import React, {Component} from "react";
import "./Name.css.scss";

class Name extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || ''
    }

    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput(e) {
    const result = e.target.value;
    this.setState({value: result});
    if(this.timeId) {
      clearTimeout(this.timeId);
    }
    this.timeId = setTimeout(()=>{
      this.timeId = 0;
      e.target.blur();
      this.props.updateFilter('q', result);
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
          onChange={ (e) =>{ (this.props.disabled) ? null : this.onChangeInput(e); } }
        />
      </div>
    );
  }
}

export default Name;
