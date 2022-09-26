import React, {Component} from "react";
import "./Kartochka.css.scss";

import {
  NavLink
} from "react-router-dom";

import Opisanie from '../Opisanie/Opisanie';
import ButtonAdd from '../Button/ButtonAdd';

import { TKartochka } from '../../store/Kartochki';

type KartochkaProps = TKartochka;

function Kartochka(props:KartochkaProps) {
  return (
    <div className="container-Kartochka" >
      <div className="container-button-add">
        <ButtonAdd id={props.id} data={props} />
      </div>
      <NavLink to={"/kartochka/"+props.id} >
        <div className="kartochka-name">{props.name}</div>
        <img
          width="100%" height="auto"
          src={props.imageUrl}
          alt={props.name}
          className="kartochka-img"
        />
      </NavLink>
      <Opisanie {...props} />
    </div>
  );
}

export default Kartochka;
