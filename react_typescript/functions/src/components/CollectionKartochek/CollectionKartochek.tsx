import React, { useReducer } from "react";
import "./CollectionKartochek.css.scss";

import Vitrina from '../Vitrina/Vitrina';

import Collection from '../../store/Collection';
import Button from '../Button/ButtonClear';

import { CollectionContext } from './CollectionContext';


type CollectionKartochekProps = {
};

function CollectionKartochek(props:CollectionKartochekProps) {

  const [, setToggleView ] = useReducer(x => x + 1, 0);

  const toggleView = ()=>{
    setToggleView();
  }

  return (
    <div className="container-CollectionKartochek" >
      <CollectionContext.Provider value={ {toggleView:toggleView} }>
        <div className="div-button_clear">
          <Button />
        </div>
        <Vitrina key="vitrina"
            dataTotalCount={Collection.size}
            dataKartochkas={Collection.dataKartochkas()}
            emltyText= {"Ваша коллекция пустая!"}
        />
      </CollectionContext.Provider>
    </div>
  );

}

export default CollectionKartochek;
