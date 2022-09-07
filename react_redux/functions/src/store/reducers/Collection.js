function reducerCollection(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_COLLECTION': {
      const addData = Object.assign({},action.data,{id:(""+action.id)});
      return state.concat([addData]);
    }
    case 'DELETE_FROM_COLLECTION': {
      const delId = ""+action.id;
      return state.filter(function(item){ return item.id !== delId });;
    }
    case 'CLEAR_COLLECTION': {
      return [];
    }
  }
  return state;
};

export default reducerCollection;
