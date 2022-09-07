import React, {Component} from "react";
import "./Kartochka.css.scss";

import {
  NavLink
} from "react-router-dom";

import Opisanie from '../Opisanie/Opisanie';
import ButtonAdd from '../Button/ButtonAdd';

class Kartochka extends Component {
  render() {
    return (
      <div className="container-Kartochka" >
        <div className="container-button-add">
          <ButtonAdd id={this.props.id} data={this.props} />
        </div>
        <NavLink to={"/kartochka/"+this.props.id} >
          <div className="kartochka-name">{this.props.name}</div>
          <img
            width="100%" height="auto"
            src={this.props.imageUrl}
            alt={this.props.name}
            className="kartochka-img"
          />
        </NavLink>
        <Opisanie {...this.props} />
      </div>
    );
  }
}

export default Kartochka;
