import React, { useState, useEffect } from "react";
import "./Numeraciya.css.scss";

import Kartochki from '../../store/Kartochki';
import { observer } from 'mobx-react-lite';


function createNumeraciyaView(_data,_value) {
  return <div {..._data} >
    {_value}
  </div>
}

function Numeraciya(props) {
  const changeCurrentPage = (_currentPage)=>{
    if (props.updateFilter) {
      props.updateFilter("_page", _currentPage);
    }
    Kartochki.setNumeraciya({currentPage: _currentPage});
  }

  const dataNumeraciya = Kartochki.dataNumeraciya;

  let _current = dataNumeraciya.currentPage;
  let _itFirst = _current === dataNumeraciya.minPage || _current == -1;
  let _itLast = _current === dataNumeraciya.maxPage || _current == -1;

  let array_pages = [];
  let from = dataNumeraciya.minPage;
  let to = dataNumeraciya.maxPage;
  if (from > 0 && to > 0) {
    for (let i = from; i <= to; ++i) {
      array_pages.push(i)
    }
  }

  if (dataNumeraciya.minPage === 0 || dataNumeraciya.maxPage === 0) {
    return null;
  } else {
    return (
      <div className="container-Numeraciya">
        {[ ["«",dataNumeraciya.minPage], ["‹",_current-1] ].map( (_arr,_index)=>{
            return createNumeraciyaView({
              key: "value_"+_arr[0] ,
              className:  "numeraciya-view " + ((_itFirst)?"is-disabled":'')  ,
              onClick: _itFirst?null:(e)=>changeCurrentPage(_arr[1], e)
            }, _arr[0]);
          })
        }

        {array_pages.map( (_value,_index)=>{
            return createNumeraciyaView({
                key: "value_"+_value ,
                className:  "numeraciya-view " + ((_value === _current)?"is-current":'') ,
                onClick: (e)=>changeCurrentPage(_value, e)
            }, _value);
          })
        }
        {[ ["›",_current+1], ["»",dataNumeraciya.maxPage] ].map( (_arr,_index)=>{
            return createNumeraciyaView({
              key: "value_"+_arr[0] ,
              className:  "numeraciya-view " + ((_itLast)?"is-disabled":'') ,
              onClick: _itLast?null:(e)=>changeCurrentPage(_arr[1], e)
            }, _arr[0]);
          })
        }
      </div>
    );
  }

}

export default observer(Numeraciya);
