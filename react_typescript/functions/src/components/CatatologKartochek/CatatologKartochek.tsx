import React, { useState, useEffect } from "react";
import "./CatatologKartochek.css";

import Numeraciya from '../Numeraciya/Numeraciya';
import Select from '../Select/Select';
import Name from '../Name/Name';
import Vitrina from '../Vitrina/Vitrina';

import Kartochki, { TDataKartochkas, TKartochka, TKeyFilters, TValueFilters } from '../../store/Kartochki';
import Authors, { TAuthor, TDataAuthors } from '../../store/Authors';
import Locations, { TLocation } from '../../store/Locations';

type CatatologKartochekProps = {
};

function CatatologKartochek(props:CatatologKartochekProps):JSX.Element {
  const filters = Kartochki.filters;

  const [dataKartochkasFull, setDataKartochkasFull] = useState<TDataKartochkas>({
    dataTotalCount: -1,
    dataKartochkas: [],
    dataNumeraciya: {
      currentPage: 1,
      minPage: 0,
      maxPage: 0
    },
    // dataAuthors: [],
    // dataLocations: []
  });

  const loadDataKartochkas = ()=>{
    Kartochki.loadData((_data:TDataKartochkas)=>{
      if(_data) {
        setDataKartochkasFull(_data);
      }
    });
  }
  useEffect(() => {
    loadDataKartochkas();
  });

  const [dataAuthors, setDataAuthors] = useState<TAuthor[]>([]);
  useEffect(() => {
    Authors.loadData((_data:TDataAuthors)=>{
      if(_data) {
        setDataAuthors(_data.dataAuthors);
      }
    });
  },[1]);

  const [dataLocations, setDataLocations] = useState<TLocation[]>([]);
  useEffect(() => {
    Locations.loadData((_data)=>{
      if(_data) {
        setDataLocations(_data.dataLocations);
      }
    });
  },[1]);

  const updateFilter = (_name: TKeyFilters, _value: TValueFilters):boolean=>{
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
      return true;
    }
    return false;
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
