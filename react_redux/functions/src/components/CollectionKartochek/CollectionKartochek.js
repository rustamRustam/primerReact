import React, { useReducer } from "react";
import "./CollectionKartochek.css.scss";

import Vitrina from '../Vitrina/Vitrina';

import Button from '../Button/ButtonClear';

import { CollectionContext } from './CollectionContext';

function CollectionKartochek(props) {

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
            dataTotalCount={props.size}
            dataKartochkas={props.dataKartochkas}
            emltyText= {"Ваша коллекция пустая!"}
        />
      </CollectionContext.Provider>
    </div>
  );

}

// export default CollectionKartochek;

import { connect } from 'react-redux';

const mapStateToProps = (store, param) => {
  return {
    dataTotalCount: store.collection.length,
    dataKartochkas: store.collection,
  };
};


const mapDispatchToProps = null;
// const mapDispatchToProps = (dispatch) => {
//   return {

//   };
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CollectionKartochek);
