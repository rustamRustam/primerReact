import React, {Component} from "react";
import "./CollectionKartochek.css.scss";

import Vitrina from '../Vitrina/Vitrina';

import Kartochki from '../../store/Kartochki';
import Authors from '../../store/Authors';
import Locations from '../../store/Locations';
import Collection from '../../store/Collection';
import Button from '../Button/ButtonClear';


import { CollectionContext } from './CollectionContext';

class CollectionKartochek extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };

    this.toggleView = this.toggleView.bind(this);
  }

  toggleView() {
    this.setState((state)=>({
      count: state.count + 1
    }))
  }

  render() {
    return (
      <div className="container-CollectionKartochek" >
        <CollectionContext.Provider value={ {toggleView:this.toggleView} }>
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
}

export default CollectionKartochek;
