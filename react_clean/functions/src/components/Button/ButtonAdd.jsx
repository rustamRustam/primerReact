import Button from './ButtonContext';
import './ButtonAdd.css.scss';

import Collection from '../../store/Collection';

import React, { useState } from 'react'

function ButtonAdd(props) {
  const [inCollection, setInCollection] = useState(Collection.has(props.id));

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
