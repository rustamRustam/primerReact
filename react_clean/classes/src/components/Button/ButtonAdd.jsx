import Button from './ButtonContext';
import './ButtonAdd.css.scss';

import Collection from '../../store/Collection';

class ButtonAdd extends Button {

  _getTitle() {
    if(Collection.has(this.props.id)) {
      return "Из коллекции";
    }
    return "В коллекцию";
  }

  _getClass() {
    if(Collection.has(this.props.id)) {
      return "button-remove";
    }
    return "button-add";
  }

  constructor(props) {
    super(props);

    this.state = {
      onClick: this.funcOnClick.bind(this),
      title: this._getTitle(),
      dopClass: this._getClass()
    }

  }

  funcOnClick() {
    if(Collection.has(this.props.id)) {
      Collection.delete(this.props.id);
    } else {
      Collection.set(this.props.id,this.props.data);
    }

    this.setState({
      title: this._getTitle(),
      dopClass: this._getClass()
    });

    super.funcOnClick();
  }

};

export default ButtonAdd;
