import React, {Component} from "react";
import "./Numeraciya.css.scss";

class Numeraciya extends Component {
  static allNumeraciya = [];

  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage || 0
    }
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
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

  changeCurrentPage(_currentPage) {
    this.props.updateFilter("_page", _currentPage);
    Numeraciya.allNumeraciya.forEach((item, i) => {
      item.setState({
        currentPage: _currentPage
      })
    });
  }

  createNumeraciyaView(_data,_value) {
    return <div {..._data} >
      {_value}
    </div>
  }

  render() {
    let _current = this.state.currentPage;
    let _itFirst = _current === this.props.minPage;
    let _itLast = _current === this.props.maxPage

    let array_pages = [];
    let from = this.props.minPage;
    let to = this.props.maxPage;
    for (let i = from; i <= to; ++i) {
      array_pages.push(i)
    }

    if (this.props.minPage === 0 || this.props.maxPage === 0) {
      return null;
    } else {
      return (
        <div className="container-Numeraciya">
          {[ ["«",this.props.minPage], ["‹",_current-1] ].map( (_arr,_index)=>{
              return this.createNumeraciyaView({
                key: "value_"+_arr[0] ,
                className:  "numeraciya-view " + ((_itFirst)?"is-disabled":'')  ,
                onClick: _itFirst?null:(e)=>this.changeCurrentPage(_arr[1], e)
              }, _arr[0]);
            })
          }

          {array_pages.map( (_value,_index)=>{
              return this.createNumeraciyaView({
                  key: "value_"+_value ,
                  className:  "numeraciya-view " + ((_value === _current)?"is-current":'') ,
                  onClick: (e)=>this.changeCurrentPage(_value, e)
              }, _value);
            })
          }
          {[ ["›",_current+1], ["»",this.props.maxPage] ].map( (_arr,_index)=>{
              return this.createNumeraciyaView({
                key: "value_"+_arr[0] ,
                className:  "numeraciya-view " + ((_itLast)?"is-disabled":'') ,
                onClick: _itLast?null:(e)=>this.changeCurrentPage(_arr[1], e)
              }, _arr[0]);
            })
          }
        </div>
      );
    }
  }
}

export default Numeraciya;
