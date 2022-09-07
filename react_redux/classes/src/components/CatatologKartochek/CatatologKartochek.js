import React, {Component} from "react";
import "./CatatologKartochek.css";

import Numeraciya from '../Numeraciya/Numeraciya';
import Select from '../Select/Select';
import Name from '../Name/Name';
import Vitrina from '../Vitrina/Vitrina';


class CatatologKartochek extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadKartochkiAction();
    this.props.loadAuthorsAction();
    this.props.loadLocationsAction();
  }

  render() {
    return (
      <div className="container-CatatologKartochek" >
        <div className="filters">
          <Name key="inputName"
            disabled={this.props.dataTotalCount === -1}
            value={this.props.filters.q}
          />
          <Select key="selectAuthor"
            disabled={this.props.dataTotalCount === -1}
            current={this.props.filters.authorId}
            values={this.props.dataAuthors}
            nameValue="name"
            nameFilter="authorId"
          />
          <Select key="selectLocation"
            disabled={this.props.dataTotalCount === -1}
            current={this.props.filters.locationId}
            values={this.props.dataLocations}
            nameValue="location"
            nameFilter="locationId"
          />
        </div>
        <div className="pagination">
          <Numeraciya key={"PaginationUp"} />
        </div>

        <Vitrina key="vitrina"
          dataTotalCount={this.props.dataTotalCount}
          dataKartochkas={this.props.dataKartochkas}
          dataAuthors={this.props.dataAuthors}
          dataLocations={this.props.dataLocations}
        />

        <div className="pagination">
          <Numeraciya key={"PaginationDown"} />
        </div>
      </div>
    );
  }
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
