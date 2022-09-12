import Button from './Button';
import './ButtonClear.css.scss';

import Collection from '../../store/Collection';

class ButtonClear extends Button {

  constructor(props) {
    super(props);

    this.state = {
      onClick: this.funcOnClick.bind(this),
      title: "Очистить коллекцию",
      dopClass: "button-clean"
    }

  }

  funcOnClick() {
    Collection.clear();
    super.funcOnClick();
  }

};

export default ButtonClear;
