import React, { useReducer } from "react";
import "./CollectionKartochek.css.scss";

import Vitrina from '../Vitrina/Vitrina';

import Collection from '../../store/Collection';
import Button from '../Button/ButtonClear';

import { observer } from 'mobx-react-lite';

function CollectionKartochek(props) {
  return (
    <div className="container-CollectionKartochek" >
      <div className="div-button_clear">
        <Button />
      </div>
      <Vitrina key="vitrina"
        dataTotalCount={Collection.size}
        dataKartochkas={Collection.dataKartochkas()}
        emltyText= {"Ваша коллекция пустая!"}
      />
    </div>
  );

}

export default observer(CollectionKartochek);
