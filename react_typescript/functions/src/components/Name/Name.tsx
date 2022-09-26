import React, { useState } from "react";
import "./Name.css.scss";

import { TUpdateFilter } from '../../store/Kartochki';

type NameProps = {
  value: string;
  disabled: boolean;
  updateFilter?: TUpdateFilter;
};

var timeId: ReturnType<typeof setTimeout> | null = null;

function Name(props:NameProps) {

  const onChangeInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const currentTarget = e.currentTarget;
    setValue(currentTarget.value);
    if(timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(()=>{
      timeId = null;
      currentTarget.blur();
      if(props.updateFilter) {
        props.updateFilter('q', currentTarget.value);
      }
    },500);
  }

  const [value, setValue] = useState<string>(props.value || '');
  return (
    <div className={"container-Name" + ((props.disabled)?" disabled ":'')} >
      <input key="nameInput"
        type="text"
        className="name-input"
        value={value}
        placeholder="Наименование картины"
        onChange={ (e: React.ChangeEvent<HTMLInputElement>)=>{ props.disabled ? null : onChangeInput(e);} }
      />
    </div>
  );

}


export default Name;
