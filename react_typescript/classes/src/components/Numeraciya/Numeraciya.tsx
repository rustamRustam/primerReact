import React, {Component} from "react";
import "./Numeraciya.css.scss";

import { TUpdateFilter } from '../../store/Kartochki';

type NumeraciyaProps = {
  currentPage:number;
  minPage:number;
  maxPage:number;
  updateFilter?: TUpdateFilter;
};

type NumeraciyaState = {
  currentPage:number;
};

class Numeraciya extends Component<NumeraciyaProps, NumeraciyaState> {
  static allNumeraciya:Numeraciya[] = [];

  state:NumeraciyaState = {
    currentPage: 0
  };

  constructor(props:NumeraciyaProps) {
    super(props);

    this.state.currentPage = this.props.currentPage || 0;

    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }

  static getDerivedStateFromProps(
      props:NumeraciyaProps,
      state:NumeraciyaState
    ) {
    if (state.currentPage !== props.currentPage) {
      return {currentPage: props.currentPage};
    }

    return null;
  }

  componentDidMount() {
    Numeraciya.allNumeraciya.push(this);
  }

  componentWillUnmount() {
    Numeraciya.allNumeraciya.splice(Numeraciya.allNumeraciya.indexOf(this), 1);
  }

  changeCurrentPage(_currentPage:number) {
    if (this.props.updateFilter) {
      this.props.updateFilter('_page', _currentPage);
    }

    Numeraciya.allNumeraciya.forEach((item:Numeraciya, i) => {
      item.setState({
        currentPage: _currentPage
      })
    });
  }

  createNumeraciyaView(_data:{},_value:number|string ) {
    return <div {..._data} >
      {_value}
    </div>
  }

  render() {
    let _current:number = this.state.currentPage;

    if (_current === 0 || this.props.minPage === 0 || this.props.maxPage === 0) {
      return null;
    } else {
      let _itFirst:boolean = _current === this.props.minPage;
      let _itLast:boolean = _current === this.props.maxPage;
      let array_pages:number[] = [];
      // let from = this.props.minPage;
      // let to = this.props.maxPage;
      for (let i = this.props.minPage; i <= this.props.maxPage; ++i) {
        array_pages.push(i)
      }

      const start_num:[string,number][] = [
        ["«",this.props.minPage],
        ["‹",_current-1]
      ];

      const end_num:[string,number][] = [
        ["›",_current+1],
        ["»",this.props.maxPage]
      ];

      return (
        <div className="container-Numeraciya">
          {start_num.map( (_arr,_index)=>{
              return this.createNumeraciyaView({
                key: "value_"+_arr[0] ,
                className:  "numeraciya-view " + ((_itFirst)?"is-disabled":'')  ,
                onClick: _itFirst?null:()=>{
                  this.changeCurrentPage(_arr[1]);
                }
              }, _arr[0]);
            })
          }

          {array_pages.map( (_value,_index)=>{
              return this.createNumeraciyaView({
                  key: "value_"+_value ,
                  className:  "numeraciya-view " + ((_value === _current)?"is-current":'') ,
                  onClick: ()=>this.changeCurrentPage(_value)
              }, _value);
            })
          }

          {end_num.map( (_arr,_index)=>{
              return this.createNumeraciyaView({
                key: "value_"+_arr[0] ,
                className:  "numeraciya-view " + ((_itLast)?"is-disabled":'') ,
                onClick: _itLast?null:()=>this.changeCurrentPage(_arr[1])
              }, _arr[0]);
            })
          }

        </div>
      );
    }
  }
}

export default Numeraciya;
