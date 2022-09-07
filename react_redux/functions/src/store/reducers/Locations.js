
function reducerLocations(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_LOCATIONS': {
      return action.locations;
    }
  }
  return state;
};

export default reducerLocations;
