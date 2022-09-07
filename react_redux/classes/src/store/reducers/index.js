import { combineReducers } from 'redux';

import reducerAuthors from './Authors';
import reducerLocations from './Locations';
import reducerKartochki from './Kartochki';
import reducerFilters from './Filters';
import reducerCollection from './Collection';

export const rootReducer = combineReducers({
  authors: reducerAuthors,
  locations: reducerLocations,
  filters: reducerFilters,
  kartochki: reducerKartochki,
  collection: reducerCollection
});
