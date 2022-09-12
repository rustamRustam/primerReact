import React, {Component} from "react";
import "./CatatologKartochek.css";

import Numeraciya from '../Numeraciya/Numeraciya';
import Select from '../Select/Select';
import Diaposon from '../Diaposon/Diaposon';
import Name from '../Name/Name';
import Vitrina from '../Vitrina/Vitrina';


import Kartochki from '../../store/Kartochki';
import { observer } from 'mobx-react';

class CatatologKartochek extends Component {

  constructor(props) {
    super(props);

    this.updateFilter = this.updateFilter.bind(this);
  }

  updateFilter(_name,_value) {
    if (Kartochki.updateFilter(_name,_value) ) {
      // Сброс отображения карточек перед закрузкой по фильтру
      Kartochki.setTotalCount(-1);
      Kartochki.setKartochkas([]);
      this.loadDataKartochkas();
    }
  }

  componentDidMount() {
    this.loadDataKartochkas();
    this.loadDataAuthors();
    this.loadDataLocations();
  }

  loadDataKartochkas() {
    Kartochki.loadData();
  }

  loadDataAuthors() {
    this.props.authors.loadData();
  }

  loadDataLocations() {
    this.props.locations.loadData();
  }

  render() {
    const filters = Kartochki.filters;
    const { dataAuthors } = this.props.authors;
    const { dataLocations } = this.props.locations;

    const dataTotalCount = Kartochki.dataTotalCount;
    const dataKartochkas = Kartochki.dataKartochkas;

    return (
      <div className="container-CatatologKartochek" >
        <div className="filters">
          <Name key="inputName"
            disabled={dataTotalCount === -1}
            value={filters.q}
            updateFilter={this.updateFilter}
          />
          <Select key="selectAuthor"
            disabled={dataTotalCount === -1}
            current={filters.authorId}
            values={dataAuthors} nameValue="name"
            updateFilter={this.updateFilter}
            nameFilter="authorId"
          />
          <Select key="selectLocation"
            disabled={dataTotalCount === -1}
            current={filters.locationId}
            values={dataLocations} nameValue="location"
            updateFilter={this.updateFilter}
            nameFilter="locationId"
          />
{/*            <Diaposon key="diaposonCreated"
              updateFilter={this.updateFilter}
              from = {filters.created_gte}
              to = {filters.created_lte}
          />*/}
        </div>
        <div className="pagination">
          <Numeraciya key={"PaginationUp"}

            updateFilter={this.updateFilter}
          />
        </div>

        <Vitrina key="vitrina"
          dataTotalCount={dataTotalCount}
          dataKartochkas={dataKartochkas}
          dataAuthors={dataAuthors}
          dataLocations={dataLocations}
        />

        <div className="pagination">
          <Numeraciya key={"PaginationDown"}

            updateFilter={this.updateFilter}
          />
        </div>
      </div>
    );
  }
}

// export default CatatologKartochek;

export default observer(CatatologKartochek);
