import Loader from '../Loader';
//

function constructFilters(filters) {
  let _filters = false;
  for (let _key in filters) {
    if (filters[_key]) {
      if (_filters) {
        _filters += "&" + _key + "=" +filters[_key];
      } else {
        _filters =  '?' + _key + "=" +filters[_key];
      }
    }
  }
  return _filters;
}

export default function loadKartochki() {
  if ( typeof (loadKartochki.filters) == 'undefined' ) {
    loadKartochki.filters = null;
  }

  return (dispatch, getState)=>{
    const state = getState();
    const curFilters = constructFilters(state.filters);

    if (curFilters !== loadKartochki.filters) {
      loadKartochki.filters = curFilters;
      dispatch( {
        type: 'REQUEST_KARTOCHKI',
      });

      Loader.loadData(
        "/paintings"+curFilters,
        (response)=>{

          const {data, headers} = response;
          const totalCount = headers.get("X-Total-Count");

          let maxPage = Math.floor(totalCount / state.filters._limit);

          if (totalCount % state.filters._limit > 0) {
            ++maxPage;
          }

          data.forEach((kartochka) => {
            kartochka.imageUrl = Loader.fullImageUrl(kartochka.imageUrl);
          });

          dispatch( {
            type: 'RECEIVE_KARTOCHKI',
            kartochki: {
              dataTotalCount: totalCount,
              dataKartochkas: data,
              dataNumeraciya: {
                currentPage: state.filters._page,
                minPage: 1,
                maxPage: maxPage
              }
            },
          });

        },
        true
      );
    }
  }
}


export function loadKartochkaById(inId) {
  const id = +inId;
  return (dispatch, getState)=>{
    const stateKartochkas = getState().kartochki.dataKartochkas;
    let result_data = false;

    if ( stateKartochkas && stateKartochkas.length > 0) {
      stateKartochkas.some((dataKartochki)=>{
        if(dataKartochki.id === id) {
          result_data = dataKartochki;
          return true;
        }
        return false;
      });
    }
    if (result_data) {
      dispatch( {
        type: 'RECEIVE_KARTOCHKA_ID',
        kartochka: result_data,
      });
    } else {
      Loader.loadData(
        "/paintings?id="+id,
        (response)=>{
          if (response.length) {
            result_data = response[0];
            result_data.imageUrl = Loader.fullImageUrl(result_data.imageUrl);
            dispatch( {
              type: 'RECEIVE_KARTOCHKA_ID',
              kartochka: result_data,
            });
          }
        }
      );

    }

  }
}
