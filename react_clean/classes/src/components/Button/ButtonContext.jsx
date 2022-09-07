import Button from './Button';

import { CollectionContext } from '../CollectionKartochek/CollectionContext';

class ButtonContext extends Button {
  constructor(props) {
    super(props);
  }

  funcOnClick() {
    this.context.toggleView();
  }

};

ButtonContext.contextType = CollectionContext;

export default ButtonContext;
