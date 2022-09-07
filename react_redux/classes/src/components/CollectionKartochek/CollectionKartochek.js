import React, {Component} from "react";
import "./CollectionKartochek.css.scss";

import Vitrina from '../Vitrina/Vitrina';
import Button from '../Button/ButtonClear';

import { CollectionContext } from './CollectionContext';

class CollectionKartochek extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };

    this.toggleView = this.toggleView.bind(this);
  }

  toggleView() {
    this.setState((state)=>({
      count: state.count + 1
    }))
  }

  render() {
    return (
      <div className="container-CollectionKartochek" >
        <CollectionContext.Provider value={ {toggleView:this.toggleView} }>
          <div className="div-button_clear">
            <Button />
          </div>
          <Vitrina key="vitrina"
              dataTotalCount={this.props.dataTotalCount}
              dataKartochkas={this.props.dataKartochkas}

              emltyText= {"Ваша коллекция пустая!"}
          />
        </CollectionContext.Provider>
      </div>
    );
  }
}

// export default CollectionKartochek;


import { connect } from 'react-redux';

const mapStateToProps = (store, param) => {
  return {
    dataTotalCount: store.collection.length,
    dataKartochkas: store.collection,
  };
};


const mapDispatchToProps = null;
// const mapDispatchToProps = (dispatch) => {
//   return {

//   };
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CollectionKartochek);
