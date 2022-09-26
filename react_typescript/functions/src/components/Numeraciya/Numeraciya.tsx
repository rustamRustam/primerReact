import React, { useState, useEffect } from "react";
import "./Numeraciya.css.scss";

import { TUpdateFilter } from '../../store/Kartochki';

type NumeraciyaProps = {
  currentPage:number;
  minPage:number;
  maxPage:number;
  updateFilter?: TUpdateFilter;
};


type NumeraciyaSetCurrentPage = (_n:number )=>void;

const allNumeraciya:NumeraciyaSetCurrentPage[] = [];

function createNumeraciyaView(_data:{},_value:number|string) {
  return <div {..._data} >
    {_value}
  </div>
}

function Numeraciya(props:NumeraciyaProps) {
  const changeCurrentPage = (_currentPage:number)=>{
    allNumeraciya.forEach((setCurrentPage) => {
      setCurrentPage(_currentPage);
    });

    if (props.updateFilter) {
      props.updateFilter("_page", _currentPage);
    }
  }

  const [currentPage, setCurrentPage] = useState(props.currentPage || 0);
  useEffect(()=>{
    setCurrentPage(props.currentPage);
    allNumeraciya.push(setCurrentPage);
    return ()=>{
      allNumeraciya.splice(allNumeraciya.indexOf(setCurrentPage), 1);
    };
  },[props.currentPage]);

  let _current = currentPage;

  if (_current === 0 || props.minPage === 0 || props.maxPage === 0) {
    return null;
  } else {
    let _itFirst:boolean = _current === props.minPage;
    let _itLast:boolean = _current === props.maxPage

    let array_pages:number[] = [];
    for (let i = props.minPage; i <= props.maxPage; ++i) {
      array_pages.push(i)
    }

    const start_num:[string,number][] = [
      ["«",props.minPage],
      ["‹",_current-1]
    ];

    const end_num:[string,number][] = [
      ["›",_current+1],
      ["»",props.maxPage]
    ];

    return (
      <div className="container-Numeraciya">
        {start_num.map( (_arr,_index)=>{
            return createNumeraciyaView({
              key: "value_"+_arr[0] ,
              className:  "numeraciya-view " + ((_itFirst)?"is-disabled":'')  ,
              onClick: _itFirst?null:()=>changeCurrentPage(_arr[1])
            }, _arr[0]);
          })
        }

        {array_pages.map( (_value,_index)=>{
            return createNumeraciyaView({
                key: "value_"+_value ,
                className:  "numeraciya-view " + ((_value === _current)?"is-current":'') ,
                onClick: ()=>changeCurrentPage(_value)
            }, _value);
          })
        }
        {end_num.map( (_arr,_index)=>{
            return createNumeraciyaView({
              key: "value_"+_arr[0] ,
              className:  "numeraciya-view " + ((_itLast)?"is-disabled":'') ,
              onClick: _itLast?null:()=>changeCurrentPage(_arr[1])
            }, _arr[0]);
          })
        }
      </div>
    );
  }

}

export default Numeraciya;
