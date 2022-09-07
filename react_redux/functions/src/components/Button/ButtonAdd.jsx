import Button from './ButtonContext';
import './ButtonAdd.css.scss';

import React from 'react'

function ButtonAdd(props) {

  const funcOnClick = ()=>{
    if(props.inCollection) {
      props.deleteFromCollectionAction(props.id);
    } else {
      props.addToCollectionAction(props.id, props.data);
    }
  }

  return (
    <Button
      title={ props.title }
      dopClass={ props.dopClass }
      onClick={ funcOnClick }
    />
  );

};

// export default ButtonAdd;

import { connect } from 'react-redux';

const mapStateToProps = (store, param) => {
  const findId = ""+param.id;
  let inCollection = false;
  if (store.collection.find((item)=>{return item.id === findId; })) {
    inCollection = true;
  }

  return {
    title: inCollection ? "Из коллекции" : "В коллекцию",
    dopClass: inCollection ? "button-remove" : "button-add",
    inCollection: inCollection
  };
};

import {addToCollection, deleteFromCollection} from '../../store/actions/Collection';

const mapDispatchToProps = (dispatch) => {
  return {
    addToCollectionAction: (id, data)=>{
      dispatch(addToCollection(id, data));
    },
    deleteFromCollectionAction: (id)=>{
      dispatch(deleteFromCollection(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(ButtonAdd);
