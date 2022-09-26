import Button, {ButtonProps} from './ButtonContext';
import './ButtonClear.css.scss';

import React, { useState } from 'react'

import Collection from '../../store/Collection';

function ButtonClear(props:ButtonProps) {

  const funcOnClick = ()=>{
    Collection.clear();
  }

  return (
    <Button
      onClick={funcOnClick}
      title={"Очистить коллекцию"}
      dopClass={"button-clean"}
    />
  );

}

export default ButtonClear;
