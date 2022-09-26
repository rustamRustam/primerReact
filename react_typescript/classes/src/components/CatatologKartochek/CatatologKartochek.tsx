import React, { Component } from "react";
import "./CatatologKartochek.css";

import Numeraciya from '../Numeraciya/Numeraciya';
import Select from '../Select/Select';
import Name from '../Name/Name';
import Vitrina from '../Vitrina/Vitrina';

import Kartochki, { TDataKartochkas, TKartochka, TKeyFilters, TValueFilters } from '../../store/Kartochki';
import Authors, { TAuthor } from '../../store/Authors';
import Locations, { TLocation } from '../../store/Locations';

type CatatologKartochekProps = {
};

type CatatologKartochekState = {
  dataTotalCount: number;
  dataKartochkas: TKartochka[];
  dataNumeraciya: {
    currentPage: number;
    minPage: number;
    maxPage: number;
  },
  dataAuthors: TAuthor[];
  dataLocations: TLocation[];
};


class CatatologKartochek extends Component<CatatologKartochekProps, CatatologKartochekState> {

  state: CatatologKartochekState = {
    dataTotalCount: -1,
    dataKartochkas: [],
    dataNumeraciya: {
        currentPage: 1,
        minPage: 0,
        maxPage: 0
    },
    dataAuthors: [],
    dataLocations: []
  };

  constructor(props: CatatologKartochekProps) {
    super(props);
    this.updateFilter = this.updateFilter.bind(this);
  }

  updateFilter(_name: TKeyFilters, _value: TValueFilters ):boolean {
    if (Kartochki.updateFilter(_name, _value) ) {
      // Сброс отображения карточек перед закрузкой по фильтру
      this.setState({
        dataTotalCount: -1,
        dataKartochkas: [],
        dataNumeraciya: {
          currentPage: 1,
          minPage: 0,
          maxPage: 0
        },
      });

      this.loadDataKartochkas();
      return true;
    }
    return false;
  }

  componentDidMount() {
      this.loadDataKartochkas();
      this.loadDataAuthors();
      this.loadDataLocations();
  }

  loadDataKartochkas() {
    Kartochki.loadData((_dataKartochkas:TDataKartochkas)=>{
      if(_dataKartochkas) {
        this.setState(_dataKartochkas);
      }
    });
  }

  loadDataAuthors() {
    Authors.loadData((_state:{})=>{
      if(_state) {
        this.setState(_state);
      }
    });
  }

  loadDataLocations() {
    Locations.loadData((_state:{})=>{
      if(_state) {
        this.setState(_state);
      }
    });
  }

  render() {
    const filters = Kartochki.filters;
    return (
      <div className="container-CatatologKartochek" >
        <div className="filters">
          <Name key="inputName"
            disabled={this.state.dataTotalCount === -1}
            value={filters.q}
            updateFilter={this.updateFilter}
          />
          <Select key="selectAuthor"
            disabled={this.state.dataTotalCount === -1}
            current={filters.authorId}
            values={this.state.dataAuthors} nameValue="name"
            updateFilter={this.updateFilter} nameFilter="authorId"
          />
          <Select key="selectLocation"
            disabled={this.state.dataTotalCount === -1}
            current={filters.locationId}
            values={this.state.dataLocations} nameValue="location"
            updateFilter={this.updateFilter} nameFilter="locationId"
          />
        </div>
        <div className="pagination">
          <Numeraciya key={"PaginationUp"}
            {...this.state.dataNumeraciya}
            updateFilter={this.updateFilter}
          />
        </div>

        <Vitrina key="vitrina"
          dataTotalCount={this.state.dataTotalCount}
          dataKartochkas={this.state.dataKartochkas}
          dataAuthors={this.state.dataAuthors}
          dataLocations={this.state.dataLocations}
        />

        <div className="pagination">
          <Numeraciya key={"PaginationDown"}
            {...this.state.dataNumeraciya}
            updateFilter={this.updateFilter}
           />
        </div>
      </div>
    );
  }
}

export default CatatologKartochek;
