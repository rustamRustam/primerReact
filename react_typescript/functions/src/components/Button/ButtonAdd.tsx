import Button, {ButtonProps} from './ButtonContext';
import './ButtonAdd.css.scss';
import React, { useState } from 'react'

import Collection from '../../store/Collection';

import { TKartochka } from '../../store/Kartochki';

export interface ButtonAddProps extends ButtonProps {
  id: number;
  data: TKartochka;
};

function ButtonAdd(props:ButtonAddProps) {
  const [inCollection, setInCollection] = useState<boolean>(Collection.has(props.id));

  const funcOnClick = ()=>{
    if(inCollection) {
      Collection.delete(props.id);
    } else {
      Collection.set(props.id, props.data);
    }
    setInCollection(!inCollection);
  }

  return (
    <Button
      title={ inCollection ? "Из коллекции" : "В коллекцию" }
      dopClass={inCollection ? "button-remove" : "button-add" }
      onClick={funcOnClick}
    />
  );

};

export default ButtonAdd;
