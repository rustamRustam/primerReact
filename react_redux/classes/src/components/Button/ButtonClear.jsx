import Button from './ButtonContext';
import './ButtonClear.css.scss';

class ButtonClear extends Button {

  constructor(props) {
    super(props);
  }

  funcOnClick() {
    this.props.clearCollectionAction();
    super.funcOnClick();
  }

};

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
