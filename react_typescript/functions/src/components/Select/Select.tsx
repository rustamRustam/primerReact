import React, { useState, useEffect } from "react";
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

function Select(props:SelectProps) {

  const [opened, setOpened] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(props.current || 0);

  const blurFocusOut = ()=>{
    setOpened(false);
  }

  const clickOnSelectVariant = (_current:number)=>{
    if(props.updateFilter) {
      props.updateFilter(props.nameFilter, _current);
    }
    setCurrent(_current);
    setOpened(false);
  }

  const clickOnSelectButton = ()=>{
    setOpened(!opened);
  }

  if (props.values.length < 1) {
    return (
      <div className="select-container__empty" >
        <Loading />
      </div>
    );
  } else {
    const _nameValue = props.nameValue;
    const _open = opened && !props.disabled;
    let _variants = null;

    if (_open) {(
      _variants = <div className="select-variants">
      {
        props.values.map((_data:any)=>{
          return <div key={"id"+_nameValue+_data.id}
            className={"select-variant text_dots "+((_data.id === current)?"current":'') }
            onClick={() => clickOnSelectVariant(_data.id) }
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
        className={"container-Select" + ((_open)?" opened ":'') + ((props.disabled)?" disabled ":'') }
        onBlur={blurFocusOut}
      >
        <div className="select-value text_dots">
          {getCurrentNameValue(props.values, current, _nameValue)}
          <div
            className="select-button"
            onClick={props.disabled ? undefined : clickOnSelectButton}
          >▼</div>
        </div>
        {_variants}
      </div>
    );
  }

}

  export default Select;
