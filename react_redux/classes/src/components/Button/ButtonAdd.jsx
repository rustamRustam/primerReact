import Button from './ButtonContext';
import './ButtonAdd.css.scss';

class ButtonAdd extends Button {

  constructor(props) {
    super(props);
  }

  funcOnClick() {
    if(this.props.inCollection) {
      this.props.deleteFromCollectionAction(this.props.id);
    } else {
      this.props.addToCollectionAction(this.props.id, this.props.data);
    }
    super.funcOnClick();
  }

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
