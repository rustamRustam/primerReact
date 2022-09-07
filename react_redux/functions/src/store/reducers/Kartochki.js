
let defKartochki = {
  dataTotalCount: -1,
  dataKartochkas: [],
  dataNumeraciya: {
      currentPage: 1,
      minPage: 0,
      maxPage: 0
  }
};


function reducerKartochki(state = defKartochki, action) {
  switch (action.type) {
    case 'REQUEST_KARTOCHKI': {
      return defKartochki;
    }
    case 'RECEIVE_KARTOCHKI': {
      return action.kartochki
    }
    case 'RECEIVE_KARTOCHKA_ID': {
      return Object.assign(
        {},
        state,
        {dataKartochkaID: action.kartochka }
      );
    }
  }
  return state;
};

export default reducerKartochki;
