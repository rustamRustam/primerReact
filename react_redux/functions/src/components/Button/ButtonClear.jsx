import Button from './ButtonContext';
import './ButtonClear.css.scss';

import React, { useState } from 'react'

function ButtonClear(props) {

  const funcOnClick = ()=>{
    props.clearCollectionAction();
  }

  return (
    <Button
      onClick={funcOnClick}
      title={"Очистить коллекцию"}
      dopClass={"button-clean"}
    />
  );

}

// export default ButtonClear;

import { connect } from 'react-redux';

const mapStateToProps = (store, param) => {
  return {
    title: "Очистить коллекцию",
    dopClass: "button-clean",
  };
};

import { clearCollection } from '../../store/actions/Collection';

const mapDispatchToProps = (dispatch) => {
  return {
    clearCollectionAction: ()=>{
      dispatch(clearCollection());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(ButtonClear);