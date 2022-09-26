import React, {Component} from "react";
import "./Vitrina.css";

import Kartochka from '../Kartochka/Kartochka';
import Loading from '../Loading/Loading';

import { TKartochka } from '../../store/Kartochki';
import { TAuthor } from '../../store/Authors';
import { TLocation } from '../../store/Locations';

type VitrinaProps = {
  dataTotalCount: number;
  dataKartochkas: TKartochka[];
  dataAuthors?: TAuthor[];
  dataLocations?: TLocation[];
  emltyText?: string;
};

type VitrinaState = {

};

class Vitrina extends Component<VitrinaProps,VitrinaState> {
  constructor(props: VitrinaProps) {
    super(props);
  }
  render() {
    if (this.props.dataKartochkas.length) {
      return (
        <div className="container-Vitrina">
        {
          this.props.dataKartochkas.map((dataKartochka:TKartochka)=>{
            if (!dataKartochka.autor && this.props.dataAuthors) {
              const _autor = this.props.dataAuthors.find(item => item.id === dataKartochka.authorId);
              if (_autor) {
                dataKartochka.autor = _autor["name"];
              }
            }
            if (!dataKartochka.location && this.props.dataLocations) {
              const _location = this.props.dataLocations.find(item => item.id === dataKartochka.locationId);
              if (_location) {
                dataKartochka.location = _location["location"];
              }
            }
            return <Kartochka key={"Painting"+dataKartochka.id} {...dataKartochka} />
          })
        }
        </div>
      )
    } else {
      if (this.props.dataTotalCount < 0) {
        return (
          <Loading />
        )
      } else {
        return (
          <div> { this.props.emltyText || "Не найдено ни одной картины!"} </div>
        )
      }
    }

  }
}

export default Vitrina;
