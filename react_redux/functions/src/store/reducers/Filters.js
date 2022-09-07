
let defFilters = {
  _limit: 12,
  _page: 1,
  authorId: 0, // 0 - отсутвие параметра в запросе
  locationId: 0, // 0 - отсутвие параметра в запросе
  q: '' // null или '' - отсутвие параметра в запросе
};


function reducerFilters(state = defFilters, action) {
  switch (action.type) {
    case 'SET_FILTER': {
      return Object.assign(
        {},
        state,
        action.filters
      );
    }
  }
  return state;
};

export default reducerFilters;
