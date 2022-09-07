
function reducerAuthors(state = [], action) {
  switch (action.type) {
    case 'AUTHORS_LOAD': {
      return state;
    }
    case 'RECEIVE_AUTHORS': {
      return action.authors;
    }
    case 'RECEIVE_AUTHOR_ID': {
      return [action.author];
    }
  }
  return state;
};

export default reducerAuthors;
