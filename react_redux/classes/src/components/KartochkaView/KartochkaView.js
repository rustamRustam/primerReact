import React, {Component} from "react";
import "./KartochkaView.css.scss";

import Loading from '../Loading/Loading';
import Opisanie from '../Opisanie/Opisanie';
import ButtonAdd from '../Button/ButtonAdd';

class KartochkaView extends Component {
  constructor(props) {
    super(props);
    this.props.loadKartochkaByIdAction(this.props.params.id);
    this.props.loadAuthorsAction();
    this.props.loadLocationsAction();
  }

  render() {
    if (this.props.dataKartochki) {
      const data = this.props.dataKartochki;

      if (!data.autor && this.props.dataAuthors) {
        const _autor = this.props.dataAuthors.find(item => item.id === data.authorId);
        if (_autor) {
          data.autor = _autor["name"];
        }
      }
      if (!data.location && this.props.dataLocations) {
        const _location = this.props.dataLocations.find(item => item.id === data.locationId);
        if (_location) {
          data.location = _location["location"];
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
          <Opisanie {...data} />
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


import { connect } from 'react-redux';

const mapStateToProps = (store, param) => {

  return {
    dataKartochki: store.kartochki.dataKartochkaID,
    dataAuthors: store.authors,
    dataLocations: store.locations
  };
};

import { loadKartochkaById } from '../../store/actions/Kartochki';
import loadAuthors from '../../store/actions/Authors';
import loadLocations from '../../store/actions/Locations';

const mapDispatchToProps = (dispatch) => {
  return {
    loadKartochkaByIdAction: (id) => {
      dispatch(loadKartochkaById(id));
    },
    loadAuthorsAction: () => {
      dispatch(loadAuthors());
    },
    loadLocationsAction: ()=>{
      dispatch(loadLocations());
    },
  };
};


import { useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

export default withParams(connect(
  mapStateToProps,
  mapDispatchToProps
  )(KartochkaView)
);
