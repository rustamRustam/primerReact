import Button from './Button';
import React, { useState, useEffect, useContext } from 'react'

import {ButtonProps} from './Button';
export {ButtonProps};

import { CollectionContext } from '../CollectionKartochek/CollectionContext';

function ButtonContext(props:ButtonProps) {
  const context = useContext(CollectionContext);

  const funcOnClick = ()=>{
    context.toggleView();
    if(props.onClick) {
      props.onClick();
    }
  }

  return (
    <Button
      {...props}
      onClick={funcOnClick}
    />
  )

};

export default ButtonContext;
