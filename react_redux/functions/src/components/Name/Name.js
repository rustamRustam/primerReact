import React, { useState } from "react";
import "./Name.css.scss";

var timeId = 0;

function Name(props) {

  const onChangeInput = (e)=>{
    const result = e.target.value;
    setValue(result);
    if(timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(()=>{
      timeId = 0;
      e.target.blur();
      props.updateFiltersAction('q', result);
    },500);
  }

  const [value, setValue] = useState(props.value || '');
  return (
    <div className={"container-Name" + ((props.disabled)?" disabled ":'')} >
      <input key="nameInput"
        type="text"
        className="name-input"
        value={value}
        placeholder="Наименование картины"
        onChange={ (e) =>{ (props.disabled) ? null : onChangeInput(e); } }
      />
    </div>
  );

}

// export default Name;


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
  )(Name);

