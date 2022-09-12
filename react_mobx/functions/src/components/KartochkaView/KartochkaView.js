import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./KartochkaView.css.scss";

import Kartochki from '../../store/Kartochki';
import Authors from '../../store/Authors';
import Locations from '../../store/Locations';

import Loading from '../Loading/Loading';
import Opisanie from '../Opisanie/Opisanie';
import ButtonAdd from '../Button/ButtonAdd';

import { observer } from 'mobx-react-lite';

function KartochkaView(props) {
  const params = useParams();

  useEffect(()=>{
    Kartochki.getById(params.id);
    Authors.loadData();
    Locations.loadData();
  },[params.id]);

  const data = Kartochki.kartochkaById;

  if (data) {
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

export default observer(KartochkaView);
