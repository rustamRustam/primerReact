import React, { useState, useEffect } from "react";
import "./CatatologKartochek.css";

import Numeraciya from '../Numeraciya/Numeraciya';
import Select from '../Select/Select';
import Name from '../Name/Name';
import Vitrina from '../Vitrina/Vitrina';

import Kartochki from '../../store/Kartochki';
import Authors from '../../store/Authors';
import Locations from '../../store/Locations';

function CatatologKartochek(props) {
  const filters = Kartochki.filters;

  const [dataKartochkasFull, setDataKartochkasFull] = useState({
    dataTotalCount: -1,
    dataKartochkas: [],
    dataNumeraciya: {
      currentPage: 1,
      minPage: 0,
      maxPage: 0
    }
  });

  const loadDataKartochkas = ()=>{
    Kartochki.loadData((_data)=>{
      if(_data) {
        setDataKartochkasFull(_data);
      }
    });
  }
  useEffect(() => {
    loadDataKartochkas();
  });

  const [dataAuthors, setDataAuthors] = useState([]);
  useEffect(() => {
    Authors.loadData((_data)=>{
      if(_data) {
        setDataAuthors(_data.dataAuthors);
      }
    });
  },[1]);

  const [dataLocations, setDataLocations] = useState([]);
  useEffect(() => {
    Locations.loadData((_data)=>{
      if(_data) {
        setDataLocations(_data.dataLocations);
      }
    });
  },[1]);

  const updateFilter = (_name,_value)=>{
    if (Kartochki.updateFilter(_name,_value) ) {
      // Сброс отображения карточек перед закрузкой по фильтру
      setDataKartochkasFull({
        dataTotalCount: -1,
        dataKartochkas: [],
        dataNumeraciya: {
          currentPage: 1,
          minPage: 0,
          maxPage: 0
        }
      });
    }
  }

  const {dataTotalCount, dataKartochkas, dataNumeraciya} = dataKartochkasFull;

  return (
    <div className="container-CatatologKartochek" >
      <div className="filters">
        <Name key="inputName"
          disabled={dataTotalCount === -1}
          value={filters.q}
          updateFilter={updateFilter}
        />
        <Select key="selectAuthor"
          disabled={dataTotalCount === -1}
          current={filters.authorId}
          values={dataAuthors} nameValue="name"
          updateFilter={updateFilter} nameFilter="authorId"
        />
        <Select key="selectLocation"
          disabled={dataTotalCount === -1}
          current={filters.locationId}
          values={dataLocations} nameValue="location"
          updateFilter={updateFilter} nameFilter="locationId"
        />
      </div>
      <div className="pagination">
        <Numeraciya key={"PaginationUp"} {...dataNumeraciya} updateFilter={updateFilter} />
      </div>

      <Vitrina key="vitrina"
        dataTotalCount={dataTotalCount}
        dataKartochkas={dataKartochkas}
        dataAuthors={dataAuthors}
        dataLocations={dataLocations}
      />

      <div className="pagination">
        <Numeraciya key={"PaginationDown"} {...dataNumeraciya} updateFilter={updateFilter} />
      </div>
    </div>
  );
}

export default CatatologKartochek;
