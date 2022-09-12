import React, {Component} from "react";
import "./KartochkaView.css.scss";

import Kartochki from '../../store/Kartochki';
import Authors from '../../store/Authors';
import Locations from '../../store/Locations';

import Loading from '../Loading/Loading';
import Opisanie from '../Opisanie/Opisanie';
import ButtonAdd from '../Button/ButtonAdd';

import { observer } from 'mobx-react';

class KartochkaView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {

    Kartochki.getById(this.props.params.id);
    Authors.loadData();
    Locations.loadData();

  }

  render() {
    const data = Kartochki.kartochkaById;

    if (data) {

      let view_autor = data.autor;
      if (!view_autor && Authors.dataAuthors) {
        const _autor = Authors.dataAuthors.find(item => item.id === data.authorId);
        if (_autor) {
          view_autor = _autor["name"];
        }
      }

      let view_location = data.location;
      if (!view_location && Locations.dataLocations) {
        const _location = Locations.dataLocations.find(item => item.id === data.locationId);
        if (_location) {
          view_location = _location["location"];
        }
      }

      return (
        <div className="container-KartochkaView" key={data.id}>
          <div className="opisanie-name">{data.name}</div>
          <img
            width="100%" height="auto"
            src={data.imageUrl}
            alt={data.name}
            className="kartochka-img"
          />
          <Opisanie {...data} autor={view_autor} location={view_location} />
          <div className="container-button-add">
            <ButtonAdd id={data.id} data={data} />
          </div>
        </div>
      );
    } else {
      return (
        <Loading />
      )
    }
  }
};


import { useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

export default withParams( observer(KartochkaView) );

