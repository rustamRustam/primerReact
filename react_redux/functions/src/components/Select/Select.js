import React, { useState, useEffect } from "react";
import "./Select.css.scss";

import Loading from '../Loading/Loading';


function Select(props) {

  const [opened, setOpened] = useState(false);
  const [current, setCurrent] = useState(props.current || 0);

  const blurFocusOut = ()=>{
    setOpened(false);
  }

  const clickOnSelectVariant = (_current)=>{
    props.updateFiltersAction(props.nameFilter, _current);
    setCurrent(_current);
    setOpened(false);
  }

  const clickOnSelectButton = ()=>{
    setOpened(!opened);
  }

  if (props.values.length < 1) {
    return (
      <div className="select-container__empty" >
        <Loading />
      </div>
    );
  } else {
    const _nameValue = props.nameValue;
    const _open = opened && !props.disabled;
    let _variants = null;

    if (_open) {(
      _variants = <div className="select-variants">
      {
        props.values.map((_data,_index)=>{
          return <div key={"id"+_nameValue+_data.id}
            className={"select-variant text_dots "+((_data.id === current)?"current":'') }
            onClick={(e) => clickOnSelectVariant(_data.id, e) }
          >{_data[_nameValue]}</div>
        })
      }
      </div>
    )}

    return (
      <div
        tabIndex="-1"
        className={"container-Select" + ((_open)?" opened ":'') + ((props.disabled)?" disabled ":'') }
        onBlur={blurFocusOut}
      >
        <div className="select-value text_dots">
          {props.values.find(item => item.id === current)[_nameValue]}
          <div
            className="select-button"
            onClick={props.disabled ? null : clickOnSelectButton}
          >▼</div>
        </div>
        {_variants}
      </div>
    );
  }

}

// export default Select;


import { connect } from 'react-redux';

const mapStateToProps = null;
// const mapStateToProps = (store, param) => {
//   return {
//   };
// };

import updateFilters from '../../store/actions/Filters';

const mapDispatchToProps = (dispatch) => {
  return {
    updateFiltersAction: (_name, _value)=>{
      dispatch(updateFilters(_name, _value));
    }

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Select);
