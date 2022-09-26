import React, {Component} from "react";
import "./Select.css.scss";

import Loading from '../Loading/Loading';
import { TUpdateFilter, TKeyFilters } from '../../store/Kartochki';
import { TAuthor } from '../../store/Authors';
import { TLocation } from '../../store/Locations';

type SelectProps = {
  disabled: boolean;
  current: number;
  nameValue: string;
  nameFilter: TKeyFilters;
  values: TAuthor[] | TLocation[];
  updateFilter?: TUpdateFilter;
};

type SelectState = {
  current: number;
  nameValue: string;
  opened: boolean;
};

class Select extends Component<SelectProps,SelectState> {
  state:SelectState = {
    current:  0,
    nameValue: '',
    opened: false
  };

  constructor(props:SelectProps) {
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

  clickOnSelectVariant(_current:number) {
    if(this.props.updateFilter) {
      this.props.updateFilter(this.props.nameFilter, _current);
    }
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
          this.props.values.map((_data:any)=>{
            return <div key={"id"+_nameValue+_data.id}
              className={"select-variant text_dots "+((_data.id === this.state.current)?"current":'') }
              onClick={() =>  this.clickOnSelectVariant(_data.id) }
            >{_data[_nameValue]}</div>
          })
        }
        </div>
      )}

      const getCurrentNameValue = function(values:TAuthor[]|TLocation[],curId:number,_nameV:string):string {
        let current_value:TAuthor|TLocation|null = null;
        values.some((item:TAuthor|TLocation, ind:number)=>{
          if(item.id === curId) {
            current_value = item;
            return true;
          }
          return false;
        });

        if (current_value) {
          return current_value[_nameValue];
        }
        return "Ups Ошибка";
      }

      return (
        <div
          tabIndex={-1}
          className={"container-Select" + ((_open)?" opened ":'') + ((this.props.disabled)?" disabled ":'') }
          onBlur={this.blurFocusOut}
        >
          <div className="select-value text_dots">
            {getCurrentNameValue(this.props.values,this.state.current,_nameValue)}
            <div
              className="select-button"
              onClick={this.props.disabled ? undefined : this.clickOnSelectButton }
            >▼</div>
          </div>
          {_variants}
        </div>
      );
    }
  }
}

export default Select;
