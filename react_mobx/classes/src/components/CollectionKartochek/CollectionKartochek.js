import React, {Component} from "react";
import "./CollectionKartochek.css.scss";

import Vitrina from '../Vitrina/Vitrina';
import Collection from '../../store/Collection';
import Button from '../Button/ButtonClear';

import { observer } from 'mobx-react';

class CollectionKartochek extends Component {

  constructor(props) {
    super(props);
  }

  render() {
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
}

// export default CollectionKartochek;

export default observer(CollectionKartochek);
