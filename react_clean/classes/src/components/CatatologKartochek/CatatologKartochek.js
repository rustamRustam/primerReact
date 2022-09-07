import React, {Component} from "react";
import "./CatatologKartochek.css";

import Numeraciya from '../Numeraciya/Numeraciya';
import Select from '../Select/Select';
import Diaposon from '../Diaposon/Diaposon';
import Name from '../Name/Name';
import Vitrina from '../Vitrina/Vitrina';

import Kartochki from '../../store/Kartochki';
import Authors from '../../store/Authors';
import Locations from '../../store/Locations';


class CatatologKartochek extends Component {

  constructor(props) {
    super(props);

    this.state = {
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

    this.updateFilter = this.updateFilter.bind(this);
  }

  updateFilter(_name,_value) {
    if (Kartochki.updateFilter(_name,_value) ) {
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
    }
  }

  componentDidMount() {
      this.loadDataKartochkas();
      this.loadDataAuthors();
      this.loadDataLocations();
  }

  loadDataKartochkas() {
    Kartochki.loadData((_state)=>{
      if(_state) {
        this.setState(_state);
      }
    });
  }

  loadDataAuthors() {
    Authors.loadData((_state)=>{
      if(_state) {
          this.setState(_state);
      }
    });
  }

  loadDataLocations() {
    Locations.loadData((_state)=>{
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
{/*            <Diaposon key="diaposonCreated"
              updateFilter={this.updateFilter}
              from = {filters.created_gte}
              to = {filters.created_lte}
          />*/}
        </div>
        <div className="pagination">
          <Numeraciya key={"PaginationUp"} {...this.state.dataNumeraciya} updateFilter={this.updateFilter} />
        </div>

        <Vitrina key="vitrina"
          dataTotalCount={this.state.dataTotalCount}
          dataKartochkas={this.state.dataKartochkas}
          dataAuthors={this.state.dataAuthors}
          dataLocations={this.state.dataLocations}
        />

        <div className="pagination">
          <Numeraciya key={"PaginationDown"} {...this.state.dataNumeraciya} updateFilter={this.updateFilter} />
        </div>
      </div>
    );
  }
}

export default CatatologKartochek;
