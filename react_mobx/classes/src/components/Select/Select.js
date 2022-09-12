import React, {Component} from "react";
import "./Select.css.scss";

import Loading from '../Loading/Loading';

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: this.props.current || 0,
      nameValue: this.props.nameValue,
      opened: false
    }

    this.clickOnSelectButton = this.clickOnSelectButton.bind(this);
    this.clickOnSelectVariant = this.clickOnSelectVariant.bind(this);
    this.blurFocusOut = this.blurFocusOut.bind(this);
  }

  blurFocusOut() {
    this.setState({
      opened: false
    });
  }

  clickOnSelectButton() {
    this.setState({
      opened: !this.state.opened
    });
  }

  clickOnSelectVariant(_current) {
    this.props.updateFilter(this.props.nameFilter, _current);
    this.setState({
      current: _current,
      opened: false
    });
  }

  render() {
    if (this.props.values.length < 1) {
      return (
        <div className="select-container__empty" >
          <Loading />
        </div>
      );
    } else {
      const _nameValue = this.props.nameValue;
      const _open = this.state.opened && !this.props.disabled;
      let _variants = null;

      if (_open) {(
        _variants = <div className="select-variants">
        {
          this.props.values.map((_data,_index)=>{
            return <div key={"id"+_nameValue+_data.id}
              className={"select-variant text_dots "+((_data.id === this.state.current)?"current":'') }
              onClick={(e) =>  this.clickOnSelectVariant(_data.id, e) }
            >{_data[_nameValue]}</div>
          })
        }
        </div>
      )}

      return (
        <div
          tabIndex="-1"
          className={"container-Select" + ((_open)?" opened ":'') + ((this.props.disabled)?" disabled ":'') }
          onBlur={this.blurFocusOut}
        >
          <div className="select-value text_dots">
            {this.props.values.find(item => item.id === this.state.current)[_nameValue]}
            <div
              className="select-button"
              onClick={this.props.disabled ? null : this.clickOnSelectButton}
            >▼</div>
          </div>
          {_variants}
        </div>
      );
    }
  }
}

export default Select;
