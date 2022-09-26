import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./KartochkaView.css.scss";

import Kartochki, { TKartochka } from '../../store/Kartochki';
import Authors, { TAuthor } from '../../store/Authors';
import Locations from '../../store/Locations';

import Loading from '../Loading/Loading';
import Opisanie from '../Opisanie/Opisanie';
import ButtonAdd from '../Button/ButtonAdd';

type KartochkaViewProps = {
  params?: {id:number};
};

function KartochkaView(props:KartochkaViewProps) {
  const params = useParams<{id?: string}>();
  const [data, setData] = useState<TKartochka | boolean>(false);

  useEffect(() => {
    Kartochki.getById(
      Number(params.id),
      (dataKartochki)=>{
        if(dataKartochki && typeof dataKartochki === "object") {
          Authors.getById(
            dataKartochki.authorId,
            (dataAuthor)=>{
              if(dataAuthor && typeof dataAuthor === "object") {
                dataKartochki.autor = dataAuthor.name;
                Locations.getById(
                  dataKartochki.locationId,
                  (dataLocation)=>{
                    if(dataLocation && typeof dataLocation == "object"){
                      dataKartochki.location = dataLocation.location;
                      setData(dataKartochki);
                    }
                  }
                )
              }
            }
          );
        }
      }
    );
  },[params.id]);

  if (data && typeof data === "object" ) {
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


export default KartochkaView;
