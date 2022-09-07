import Loader from '../Loader';

export default function loadLocations() {
  return (dispatch, getState)=>{
    const state = getState()
    if (!(state.authors) || state.authors.length <= 0) {
      Loader.loadData(
        "/locations",
        (response)=>{
          const dataLocations = [
          {
            "id": 0,
            "location": "Locations"
          }].concat(response);
          dispatch( {
            type: 'RECEIVE_LOCATIONS',
            locations: dataLocations,
          });
        }
      );
    }
  }
}
