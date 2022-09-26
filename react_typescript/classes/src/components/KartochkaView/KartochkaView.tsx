import React, {Component} from "react";
import "./KartochkaView.css.scss";

import Kartochki, { TKartochka } from '../../store/Kartochki';
import Authors, { TAuthor } from '../../store/Authors';
import Locations from '../../store/Locations';

import Loading from '../Loading/Loading';
import Opisanie from '../Opisanie/Opisanie';
import ButtonAdd from '../Button/ButtonAdd';

type KartochkaViewProps = {
  params?: {id:number};
};
type KartochkaViewState = {
  id: number;
  data: TKartochka | boolean;
};

class KartochkaView extends Component<KartochkaViewProps, KartochkaViewState> {
  state:KartochkaViewState = {
    id: -1,
    data: false
  }

  constructor(props:KartochkaViewProps) {
    super(props);
  }

  componentDidMount() {
    this.setState({data:false, id: 0});
  }

  shouldComponentUpdate(newProps:KartochkaViewProps, newState:KartochkaViewState) {
    return newProps.params!.id != this.state.id;
  }

  componentDidUpdate() {
    if (this.props.params && this.props.params.id) {
      Kartochki.getById(
        this.props.params.id,
        (dataKartochki)=>{
          if(dataKartochki && typeof dataKartochki === "object") {
            Authors.getById(
              dataKartochki.authorId,
              (dataAuthor)=>{
                if(dataAuthor && typeof dataAuthor === "object") {
                  dataKartochki.autor = dataAuthor.name;
                  Locations.getById(
                    dataKartochki.locationId,
                    (dataLocation)=>{
                      if(dataLocation && typeof dataLocation == "object"){
                        dataKartochki.location = dataLocation.location;
                        this.setState({data:dataKartochki, id: dataKartochki.id});
                      } else {
                        this.setState({data:false, id: this.props.params!.id});
                      }
                    }
                  )
                } else {
                  this.setState({data:false, id: this.props.params!.id});
                }
              }
            );
          } else {
            this.setState({data:false, id: this.props.params!.id});
          }
        }
      );
    }
  }

  render() {
    if (this.state.data && typeof this.state.data === "object") {
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


// export default KartochkaView;

import { useParams } from "react-router-dom";

type KartochkaViewParams = {
  id: string;
};

function withParams() {
  return (props:KartochkaViewProps) => {
    const _params = useParams<KartochkaViewParams>();
    return <KartochkaView {...props} params={ {id:Number(_params.id)} } />;
  };
}

export default withParams();
