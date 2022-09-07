import React, { useState, useEffect } from "react";
import "./CatatologKartochek.css";

import Numeraciya from '../Numeraciya/Numeraciya';
import Select from '../Select/Select';
import Name from '../Name/Name';
import Vitrina from '../Vitrina/Vitrina';


function CatatologKartochek(props) {
  // const filters = Kartochki.filters;

  // const [dataKartochkasFull, setDataKartochkasFull] = useState({
  //   dataTotalCount: -1,
  //   dataKartochkas: [],
  //   dataNumeraciya: {
  //     currentPage: 1,
  //     minPage: 0,
  //     maxPage: 0
  //   }
  // });

  // const loadDataKartochkas = ()=>{
  //   Kartochki.loadData((_data)=>{
  //     if(_data) {
  //       setDataKartochkasFull(_data);
  //     }
  //   });
  // }
  // useEffect(() => {
  //   loadDataKartochkas();
  // });

  // const [dataAuthors, setDataAuthors] = useState([]);
  // useEffect(() => {
  //   Authors.loadData((_data)=>{
  //     if(_data) {
  //       setDataAuthors(_data.dataAuthors);
  //     }
  //   });
  // },[1]);

  // const [dataLocations, setDataLocations] = useState([]);
  // useEffect(() => {
  //   Locations.loadData((_data)=>{
  //     if(_data) {
  //       setDataLocations(_data.dataLocations);
  //     }
  //   });
  // },[1]);

  useEffect(() => {
    props.loadKartochkiAction();
    props.loadAuthorsAction();
    props.loadLocationsAction();
  },[1]);

  // const updateFilter = (_name,_value)=>{
  //   if (Kartochki.updateFilter(_name,_value) ) {
  //     // Сброс отображения карточек перед закрузкой по фильтру
  //     setDataKartochkasFull({
  //       dataTotalCount: -1,
  //       dataKartochkas: [],
  //       dataNumeraciya: {
  //         currentPage: 1,
  //         minPage: 0,
  //         maxPage: 0
  //       }
  //     });
  //   }
  // }

  // const {dataTotalCount, dataKartochkas, dataNumeraciya} = dataKartochkasFull;
  const {dataTotalCount, dataKartochkas, dataAuthors, dataLocations} = props;

  return (
    <div className="container-CatatologKartochek" >
      <div className="filters">
        <Name key="inputName"
          disabled={dataTotalCount === -1}
          value={props.filters.q}

        />
        <Select key="selectAuthor"
          disabled={dataTotalCount === -1}
          current={props.filters.authorId}
          values={dataAuthors} nameValue="name"

          nameFilter="authorId"
        />
        <Select key="selectLocation"
          disabled={dataTotalCount === -1}
          current={props.filters.locationId}
          values={dataLocations} nameValue="location"

          nameFilter="locationId"
        />
      </div>
      <div className="pagination">
        <Numeraciya key={"PaginationUp"} />
      </div>

      <Vitrina key="vitrina"
        dataTotalCount={dataTotalCount}
        dataKartochkas={dataKartochkas}
        dataAuthors={dataAuthors}
        dataLocations={dataLocations}
      />

      <div className="pagination">
        <Numeraciya key={"PaginationDown"} />
      </div>
    </div>
  );
}

// export default CatatologKartochek;

import { connect } from 'react-redux';

const mapStateToProps = (store, param) => {
  return {
    dataTotalCount: store.kartochki.dataTotalCount,
    dataKartochkas: store.kartochki.dataKartochkas,
    filters: store.filters,
    dataAuthors: store.authors,
    dataLocations: store.locations
  };

};

import loadAuthors from '../../store/actions/Authors';
import loadLocations from '../../store/actions/Locations';
import loadKartochki from '../../store/actions/Kartochki';

const mapDispatchToProps = (dispatch) => {
  return {
    loadAuthorsAction: () => {
      dispatch(loadAuthors());
    },
    loadLocationsAction: ()=>{
      dispatch(loadLocations());
    },
    loadKartochkiAction: ()=>{
      dispatch(loadKartochki());
    }

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CatatologKartochek);

