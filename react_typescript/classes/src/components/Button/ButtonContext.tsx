import * as React from 'react';
import Button from './Button';

import {ButtonProps, ButtonState} from './Button';
export {ButtonProps, ButtonState};


import { CollectionContext, CollectionContextInterface } from '../CollectionKartochek/CollectionContext';

class ButtonContext<BP extends ButtonProps = ButtonProps> extends Button<BP> {
  constructor(props:BP ) {
    super(props);
  }

  funcOnClick() {
    const { toggleView } = this.context as CollectionContextInterface;
    toggleView();

  }

};

ButtonContext.contextType = CollectionContext;

export default ButtonContext;
