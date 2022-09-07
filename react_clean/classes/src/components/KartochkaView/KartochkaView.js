import React, {Component} from "react";
import "./KartochkaView.css.scss";

import Kartochki from '../../store/Kartochki';
import Authors from '../../store/Authors';
import Locations from '../../store/Locations';

import Loading from '../Loading/Loading';
import Opisanie from '../Opisanie/Opisanie';
import ButtonAdd from '../Button/ButtonAdd';

class KartochkaView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      data: false
    }
  }

  componentDidMount() {
    this.setState({data:false, id: 0});
  }

  shouldComponentUpdate(newProps,newState) {
    return newProps.params.id != this.state.id;
  }

  componentDidUpdate() {
    Kartochki.getById(
      this.props.params.id,
      (dataKartochki)=>{
        if(dataKartochki) {
          Authors.getById(
            dataKartochki.authorId,
            (dataAuthor)=>{
              if(dataAuthor) {
                dataKartochki.autor = dataAuthor.name;
                Locations.getById(
                  dataKartochki.locationId,
                  (dataLocation)=>{
                    if(dataLocation){
                      dataKartochki.location = dataLocation.location;
                      this.setState({data:dataKartochki, id: dataKartochki.id});
                    }
                  }
                )
              }
            }
          );
        }
      }
    );
  }

  render() {
    if (this.state.data) {
      const data = this.state.data;
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
  }
};


import { useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

export default withParams(KartochkaView);
