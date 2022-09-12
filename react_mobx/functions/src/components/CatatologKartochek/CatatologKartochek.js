import React, { useState, useEffect } from "react";
import "./CatatologKartochek.css";

import Numeraciya from '../Numeraciya/Numeraciya';
import Select from '../Select/Select';
import Name from '../Name/Name';
import Vitrina from '../Vitrina/Vitrina';

import Kartochki from '../../store/Kartochki';

import { observer } from 'mobx-react-lite';

function CatatologKartochek(props) {
  const filters = Kartochki.filters;

  const updateFilter = (_name,_value)=>{
    if (Kartochki.updateFilter(_name,_value) ) {
      Kartochki.setTotalCount(-1);
      Kartochki.setKartochkas([]);
    }
  }

  const loadDataKartochkas = ()=>{
    Kartochki.loadData();
  }

  useEffect(() => {
    props.authors.loadData();
    props.locations.loadData();
    loadDataKartochkas();
  });

  const { dataAuthors } = props.authors;
  const { dataLocations } = props.locations;
  const dataTotalCount = Kartochki.dataTotalCount;
  const dataKartochkas = Kartochki.dataKartochkas;

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
        <Numeraciya key={"PaginationUp"} updateFilter={updateFilter} />
      </div>

      <Vitrina key="vitrina"
        dataTotalCount={dataTotalCount}
        dataKartochkas={dataKartochkas}
        dataAuthors={dataAuthors}
        dataLocations={dataLocations}
      />

      <div className="pagination">
        <Numeraciya key={"PaginationDown"} updateFilter={updateFilter} />
      </div>
    </div>
  );
}

export default observer(CatatologKartochek);
