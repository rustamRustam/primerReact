import React, {Component} from "react";
import "./Opisanie.css.scss";

type OpisanieProps = {
  [key:string]:any
};

class Opisanie extends Component<OpisanieProps> {
  render() {
    return (
      <div className="container-Opisanie">
        <div className="opisanie-data">
          <div className="opisanie-title-info">
            <div className="opisanie-title text_dots">Автор:</div>
            <div className="opisanie-info left-space text_dots" key="autor">{this.props.autor}</div>
          </div>

          <div className="opisanie-title-info">
            <div className="opisanie-title text_dots">Cоздано:</div>
            <div className="opisanie-info left-space text_dots" key="created">{this.props.created}</div>
          </div>

          <div className="opisanie-title-info">
            <div className="opisanie-title text_dots">Локация:</div>
            <div className="opisanie-info left-space text_dots"  key="location">{this.props.location}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Opisanie;
