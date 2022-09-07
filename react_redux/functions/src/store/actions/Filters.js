import loadKartochki from './Kartochki';

export default function updateFilters(_name,_value) {
  return (dispatch, getState)=>{
    dispatch({
      type: 'SET_FILTER',
      filters:{
        _page: 1,
        [_name]:_value
      }
    });

    dispatch(loadKartochki());

  }
}