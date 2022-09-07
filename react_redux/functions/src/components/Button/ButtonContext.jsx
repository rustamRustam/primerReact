import Button from './Button';
import React, { useState, useEffect, useContext } from 'react'

import { CollectionContext } from '../CollectionKartochek/CollectionContext';

function ButtonContext(props) {
  const context = useContext(CollectionContext);

  const funcOnClick = ()=>{
    context.toggleView();
    props.onClick();
  }

  return (
    <Button
      {...props}
      onClick={funcOnClick}
    />
  )

};

export default ButtonContext;
