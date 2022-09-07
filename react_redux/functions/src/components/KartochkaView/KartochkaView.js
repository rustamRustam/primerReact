import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./KartochkaView.css.scss";

import Loading from '../Loading/Loading';
import Opisanie from '../Opisanie/Opisanie';
import ButtonAdd from '../Button/ButtonAdd';

function KartochkaView(props) {
  const params = useParams();

  useEffect(() => {
    props.loadKartochkaByIdAction(params.id);
    props.loadAuthorsAction();
    props.loadLocationsAction();
  },[params.id]);

  if (props.dataKartochki) {
    const data = props.dataKartochki;
    if (!data.autor && props.dataAuthors) {
      const _autor = props.dataAuthors.find(item => item.id === data.authorId);
      if (_autor) {
        data.autor = _autor["name"];
      }
    }
    if (!data.location && props.dataLocations) {
      const _location = props.dataLocations.find(item => item.id === data.locationId);
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

};


// export default KartochkaView;

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(KartochkaView);
