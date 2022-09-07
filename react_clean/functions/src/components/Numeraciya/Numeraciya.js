import React, { useState, useEffect } from "react";
import "./Numeraciya.css.scss";

const allNumeraciya = [];

function createNumeraciyaView(_data,_value) {
  return <div {..._data} >
    {_value}
  </div>
}

function Numeraciya(props) {
  const changeCurrentPage = (_currentPage)=>{
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
  let _itFirst = _current === props.minPage;
  let _itLast = _current === props.maxPage

  let array_pages = [];
  let from = props.minPage;
  let to = props.maxPage;
  for (let i = from; i <= to; ++i) {
    array_pages.push(i)
  }

  if (props.minPage === 0 || props.maxPage === 0) {
    return null;
  } else {
    return (
      <div className="container-Numeraciya">
        {[ ["«",props.minPage], ["‹",_current-1] ].map( (_arr,_index)=>{
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
        {[ ["›",_current+1], ["»",props.maxPage] ].map( (_arr,_index)=>{
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

export default Numeraciya;